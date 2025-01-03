"use server";


export const createDwollaCustomer = async(
    newCustomer: NewDwollaCustomerParams
) => {
    try{
        return await dwollaClient
        .post("customers",newCustomer)
        .then((res) => res.headers.get("location"));
    }catch(error){
        console.error("Error",error);
    }
};