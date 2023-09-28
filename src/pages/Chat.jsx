import Dlayout from '@/components/Dlayout'
import React from 'react'

const Chat = () => {
    return (
        <Dlayout>Chat


            <div className="chatContainer">
                <div className="comming_soon">
                    <h1>Comming Soon...</h1>
                </div>
                <div className="Left_Chart ">
                    <ul>
                        <li>
                            <span className='active_color'></span>
                            <i className="bi bi-person-circle"></i>Ram</li>
                        <li>
                            <span className='active_color1'></span>
                            <i className="bi bi-person-circle"></i>Shyam</li><li>
                            <span className='active_color2'></span>
                            <i className="bi bi-person-circle"></i>Hari</li>

                    </ul>
                </div>
                <div className="Right_chat">
                    <div className="textMessage_row">
                        <div className="input_field">
                            <input type="text" placeholder='Developing Process...' />
                            <i className="bi bi-send text-white fs-5"></i>
                        </div>
                    </div>
                </div>
            </div>
        </Dlayout>
    )
}

export default Chat