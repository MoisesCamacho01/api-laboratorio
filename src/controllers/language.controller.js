import {getConnection} from "./../database/database"

const getLanguage= async(request, response)=>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuarios");
        let js = {
            "nombre":[
                {
                    "apellido":"casa",
                    "edad":27
                },
                {
                    "apellido":"Perez",
                    "edad":28
                }
            ],
            "msm": "bien"
        }
        response.json(js)
        
    } catch (error) {
        response.status(500);
        response.send(error.message);
    }
    
}


export const methods = {
    getLanguage
};