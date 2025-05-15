"use client"

import { db } from './firebase'
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, doc, getDoc } from 'firebase/firestore'

// Tipos para los resultados del cuestionario
export interface QuestionnaireResult {
  id?: string
  empresa: string
  email: string
  sector: string
  tecnologias: string[]
  mantenimientoTI: string
  herramientasSeguridad: string
  formacion: string
  politicaContrasenas: string
  eliminacionDatos: string
  redesSociales: string
  riesgoTotal: number
  createdAt?: any // Timestamp de Firestore
  fechaCreacion?: string // Fecha en formato ISO
}

// Función para guardar un resultado del cuestionario
export const saveQuestionnaireResult = async (result: Omit<QuestionnaireResult, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, "questionnaire-results"), {
      ...result,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving questionnaire result:", error);
    throw error;
  }
};

// Función para obtener todos los resultados
export const getAllResults = async (): Promise<QuestionnaireResult[]> => {
  try {
    console.log("Fetching all results from Firestore")
    const resultsRef = collection(db, "questionnaire-results")
    const q = query(resultsRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    
    const results: QuestionnaireResult[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      results.push({
        id: doc.id,
        empresa: data.empresa || "",
        email: data.email || "",
        sector: data.sector || "",
        tecnologias: data.tecnologias || [],
        mantenimientoTI: data.mantenimientoTI || "",
        herramientasSeguridad: data.herramientasSeguridad || "",
        formacion: data.formacion || "",
        politicaContrasenas: data.politicaContrasenas || "",
        eliminacionDatos: data.eliminacionDatos || "",
        redesSociales: data.redesSociales || "",
        riesgoTotal: data.riesgoTotal || 0,
        createdAt: data.createdAt,
        fechaCreacion: data.createdAt?.toDate().toISOString() || new Date().toISOString()
      })
    })

    console.log(`Found ${results.length} results`)
    return results
  } catch (error) {
    console.error("Error getting all results:", error)
    throw error
  }
}

// Función para obtener resultados por email
export const getResultsByEmail = async (email: string) => {
  try {
    const q = query(
      collection(db, "questionnaire-results"),
      where("email", "==", email),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as QuestionnaireResult[];
  } catch (error) {
    console.error("Error getting results by email:", error);
    throw error;
  }
};

// Función para obtener un resultado específico por ID
export const getResultById = async (id: string): Promise<QuestionnaireResult | null> => {
  try {
    console.log("Iniciando búsqueda de resultado con ID:", id)
    const docRef = doc(db, "questionnaire-results", id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      console.log("No se encontró el documento con ID:", id)
      return null
    }

    const data = docSnap.data()
    console.log("Datos encontrados:", data)

    // Asegurarse de que todos los campos requeridos estén presentes
    const result: QuestionnaireResult = {
      id: docSnap.id,
      empresa: data.empresa || "",
      email: data.email || "",
      sector: data.sector || "",
      tecnologias: data.tecnologias || [],
      mantenimientoTI: data.mantenimientoTI || "",
      herramientasSeguridad: data.herramientasSeguridad || "",
      formacion: data.formacion || "",
      politicaContrasenas: data.politicaContrasenas || "",
      eliminacionDatos: data.eliminacionDatos || "",
      redesSociales: data.redesSociales || "",
      riesgoTotal: data.riesgoTotal || 0,
      createdAt: data.createdAt?.toDate() || new Date(),
      fechaCreacion: data.createdAt?.toDate().toISOString() || new Date().toISOString()
    }

    console.log("Resultado procesado:", result)
    return result
  } catch (error) {
    console.error("Error en getResultById:", error)
    throw error
  }
} 