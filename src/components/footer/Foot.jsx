import React from 'react'
import { Footer, Breadcrumb, Box, Icon, Image, Heading } from "react-bulma-components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons"

import "./Foot.css"
function Foot() {
    return (
        <Footer style={{ paddingInline: "0px" }} textAlign="center" backgroundColor='white'>
            <Box radiusless shadowless marginless style={{ backgroundColor: "#E80505" }}>
                <Breadcrumb separator="arrow">

                    <Breadcrumb.Item >
                        <a style={{ color: "white", flexDirection: "column"}}>
                            <strong> Contact Us</strong>
                            <div style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                <Icon size="large">
                                    <i className={`fas fa-lg fa-envelope`}></i>
                                </Icon>
                                <div>
                                    <p>andresfelipear@gmail.com</p>
                                </div>
                            </div>

                        </a>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item >
                        <a style={{ color: "white", flexDirection: "column"}}>
                            <strong> Social Media</strong>
                            <div >
                                <Icon size="large">
                                    <FontAwesomeIcon size="lg" icon={faFacebook}/>
                                </Icon>
                                <Icon size="large">
                                    <FontAwesomeIcon size="lg" icon={faInstagram}/>
                                </Icon>
                            </div>
                        </a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Box>
            <p style={{
                fontSize: "12px",
                fontStyle: "italic",
            }}>© 2022 Andres Arevalo - World Holidays </p>
        </Footer>
    )
}

export default Foot