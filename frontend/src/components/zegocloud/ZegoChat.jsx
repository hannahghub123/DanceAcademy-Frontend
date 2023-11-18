// import React, { useEffect, useState } from 'react'
// import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
// import '@zegocloud/zimkit-react/index.css';
// import Back from '../common/back/Back';


// const id = Math.floor(Math.random()*1000)
// const ZegoChat = () => {

//     const [state,setState]=useState(
//         {
//             appConfig: {
//                 appID: 2089810878,     
//                 serverSecret: '145f8c3d8c5d464a98eefadab2499316' 
//             },
//            userInfo: {
//                 userID: `Hannah${id}`,
//                 userName: `Hannah${id}`,
//                 userAvatarUrl: ''
//             },
//         }
//     )

//     useEffect(() => {
//         const init = async () => {
//             try {
//                 const zimKit = new ZIMKitManager();
//                 const token = zimKit.generateKitTokenForTest(state.appConfig.appID, state.appConfig.serverSecret, state.userInfo.userID);
//                 await zimKit.init(state.appConfig.appID);
//                 await zimKit.connectUser(state.userInfo, token);
//             } catch (error) {
//                 handleError(error);
//             }
//         }
//         init();
//     }, []);

//     const handleError = (error) => {
//         console.error('Error:', error);
//     };
    

//   return (
//     <div>
//         <Back/>
//         {state.userInfo.userID}
//         <Common></Common> 
//     </div>

//   )
// }

// export default ZegoChat