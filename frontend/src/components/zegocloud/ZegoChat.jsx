import React, { useEffect, useState } from 'react'
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';
import Back from '../common/back/Back';


const id = Math.floor(Math.random()*1000)
const ZegoChat = () => {

    const [state,setState]=useState(
        {
            appConfig: {
                appID: 2089810878,        // The AppID you get from the ZEGOCLOUD admin console.
                serverSecret: '145f8c3d8c5d464a98eefadab2499316' // The serverSecret you get from ZEGOCLOUD Admin Console.
            },
            // The userID and userName is a strings of 1 to 32 characters.
            // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
            userInfo: {
                // Your ID as a user.
                userID: `Hannah${id}`,
                // Your name as a user.
                userName: `Hannah${id}`,
                // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
                userAvatarUrl: ''
            },
        }
    )

    useEffect(() => {
        const init = async () => {
            try {
                const zimKit = new ZIMKitManager();
                const token = zimKit.generateKitTokenForTest(state.appConfig.appID, state.appConfig.serverSecret, state.userInfo.userID);
                await zimKit.init(state.appConfig.appID);
                await zimKit.connectUser(state.userInfo, token);
            } catch (error) {
                handleError(error);
            }
        }
        init();
    }, []);

    const handleError = (error) => {
        console.error('Error:', error);
        // Add additional error handling code if needed
    };
    

  return (
    <div>
        <Back/>
        {state.userInfo.userID}
        <Common></Common> 
    </div>

  )
}

export default ZegoChat