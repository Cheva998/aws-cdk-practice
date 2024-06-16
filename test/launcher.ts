
// import { handler } from "../src/services/hello";
// handler({} as any, {} as any);




import { handler } from "../src/services/spaces/handler";


handler({
    httpMethod: 'POST',
    body: JSON.stringify({
        location: 'Dublin'
    })
} as any, {} as any).then(result => {
    console.log(result)
});



// handler({
//     httpMethod: 'GET',
//     queryStringParameters: {
//         id: '3204f7ed-3818-49a2-8834-6524c3e9c56a'
//     }
// } as any, {} as any);


// handler({
//         httpMethod: 'PUT',
//         body: JSON.stringify({
//             location: 'Brusselss'
//         }),
//         queryStringParameters: {
//                     id: '75f4092f-1811-4c35-a69d-815e2e917a48'
//                 }
//     } as any, {} as any);



// handler({
//     httpMethod: 'DELETE',
//     queryStringParameters: {
//                 id: '75f4092f-1811-4c35-a69d-815e2e917a48'
//             }
// } as any, {} as any);