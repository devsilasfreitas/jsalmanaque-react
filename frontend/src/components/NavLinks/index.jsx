import { Link } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

export const NavLinks = ({backPage, nextPage, children}) => (
    <>
        <section style={{display: 'grid', gridTemplateColumns: '50% 50%', margin: '20px 0'}}>
            <div>
                {backPage && (
                    <Link to={backPage} style={{ display: 'inline-block', textAlign: 'center' }}>
                        <Button type="primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowLeftOutlined /> Anterior</Button>
                    </Link>
                )}
            </div>
            <div style={{textAlign: 'right'}}>
                {nextPage && (
                    <Link to={nextPage} style={{ display: 'inline-block', textAlign: 'center' }}>
                        <Button type="primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Seguinte <ArrowRightOutlined /></Button>
                    </Link>
                )}
            </div>
        </section>
        {children}
        <section style={{display: 'grid', gridTemplateColumns: '50% 50%', margin: '20px 0'}}>
            <div>
                {backPage && (
                    <Link to={backPage} style={{ display: 'inline-block', textAlign: 'center' }}>
                        <Button type="primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowLeftOutlined /> Anterior</Button>
                    </Link>
                )}
            </div>
            <div style={{textAlign: 'right'}}>
                {nextPage && (
                    <Link to={nextPage} style={{ display: 'inline-block', textAlign: 'center' }}>
                        <Button type="primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Seguinte <ArrowRightOutlined /></Button>
                    </Link>
                )}
            </div>
        </section>
    </>
);