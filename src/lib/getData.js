'use server'
import axios from 'axios'
import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'  
const server = process.env.SERVER_API
async function getJwt() {
    const jwt = (await cookies()).get('jwt')?.value || null
    // console.log(jwt)
    if (!jwt) redirect('/login')
    return jwt
}
export async function getContractItem(idContract) {
    try {
        const res = await axios.get(server + `/api/contracts/${idContract}?populate[0]=contractor&populate[1]=document&populate[2]=steps.photos`, {
            headers: {
                Authorization: `Bearer ${await getJwt()}`
            }
        })
        if (res.data) {
            console.log(res.data.data)
            return res.data.data
        }

    } catch (error) {
        console.log("error:", error);
    }
}
export async function getContractorItem(idContractor) {
    
    try {
        const res = await axios.get(server + `/api/contractors/${idContractor}?populate=contracts`, {
            headers: {
                Authorization: `Bearer ${await getJwt()}`
            }
        })
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log("error:", error);
    }
}
export async function getMyContractors() {
    try {
        const res = await axios.get(server + '/api/mycontractors?populate=contracts', {
            headers: {

                Authorization: `Bearer ${await getJwt()}`
            }
        })
        if (res.data) {
            return res.data.results[0]
        }
        // console.log("contractors:", contractors);
    } catch (error) {
        console.log("error:", error);

    }
}
export async function getAllContracts(pageSize = 5, page = 1) {
    
    try {
        const res = await axios.get(server + `/api/contracts?pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=contractor`, {
            headers: {

                Authorization: `Bearer ${await getJwt()}`
            }
        })
        if (res.data) {
            return res.data
        }
        // console.log("contractors:", contractors);
    } catch (error) {
        console.log("error:", error);
    }
}
export async function getAllContractors(pageSize = 5, page = 1) {
    
    try {
        const res = await axios.get(server + `/api/contractors?pagination[pageSize]=${pageSize}&pagination[page]=${page}`, {
            headers: {

                Authorization: `Bearer ${await getJwt()}`
            }
        })
        if (res.data) {
            return res.data
        }
        // console.log("contractors:", contractors);
    } catch (error) {
        console.log("error:", error);
    }
}
export async function getContractorItemForAdmin(idContractor) {
    
    try {
        const res = await axios.get(server + `/api/contractors/${idContractor}?populate[0]=contracts&populate[1]=user`, {
            headers: {
                Authorization: `Bearer ${await getJwt()}`
            }
        })
        if (res.data) {
            return res.data.data
        }
    } catch (error) {
        console.log("error:", error);
    }
}
