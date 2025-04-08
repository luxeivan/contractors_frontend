import axios from 'axios'
import { cookies } from 'next/headers'
const server = process.env.SERVER_API

export async function getContractItem(idContract) {
    const jwt = (await cookies()).get('jwt')?.value || null
    try {
        const res = await axios.get(server + `/api/contracts/${idContract}?populate[steps][populate][0]=photos`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        if (res.data) {
            return res.data.data
        }
        
    } catch (error) {
        console.log("error:", error);
    }
}
export async function getContractorItem(idContractor) {
    const jwt = (await cookies()).get('jwt')?.value || null
    try {
        const res = await axios.get(server + `/api/contractors/${idContractor}?populate=contracts`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        if (res.data) {
          return res.data
        }
      } catch (error) {
        console.log("error:", error);
      }
}
export async function getContractors() {
    const jwt = (await cookies()).get('jwt')?.value || null
    try {
        const res = await axios.get(server + '/api/contractors', {
            headers: {

                Authorization: `Bearer ${jwt}`
            }
        })
        if (res.data) {
            return res.data.results
        }
        // console.log("contractors:", contractors);
    } catch (error) {
        console.log("error:", error);

    }
}