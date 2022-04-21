
import "./Header.css"
import React from "react";

import {Box, Breadcrumb, Icon} from "react-bulma-components";


function Header() {



    return (
        <div>
            <Box radiusless display="flex" shadowless marginless justifyContent="center" style={{ backgroundColor: "#905960" }}>
                <Breadcrumb separator="bullet" className="header">
                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection: "column", marginInline: "30px" }}>
                            <strong>Contact Numbers</strong>
                            <div>
                                <Icon size="small">
                                    <i className={`fas fa-phone`}></i>
                                </Icon>
                                +1 (236)-986-XXXX
                            </div>

                        </a>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection: "column", marginInline: "30px" }}>
                            <strong> Schedule</strong>
                            <div>
                                <Icon size="small">
                                    <i className={`fas fa-calendar`}></i>
                                </Icon>
                                M-F 8am - 6pm / Saturday 9am - 3pm
                            </div>

                        </a>
                    </Breadcrumb.Item>

                </Breadcrumb>
            </Box>

        </div>
    )
}

export default Header