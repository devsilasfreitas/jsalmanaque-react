import { useEffect, useState } from "react";
import { useContents } from "../../contexts/ContentsContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout, Menu, theme, Button, Spin } from 'antd';
import hljs from "highlight.js";
import { MenuFoldOutlined, MenuUnfoldOutlined, LoadingOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
const { Header, Content, Sider} = Layout;

import "highlight.js/styles/github-dark.min.css";
import styles from "./ContentLayout.module.css";
import { SearchBox } from "../../components/SearchBox";
import "./codeContainer.css";
import { createCopyCode } from "../../functions/createCopyCode";

export default function ContentLayout ()  {
    const { getContentsSorted, getContentByPagePath } = useContents();
    const [items, setItems] = useState();
    const [content, setContent] = useState();
    const [ loading, setLoading ] = useState(true);
    const { language, module, title } = useParams();
    const [htmlContent, setHtmlContent] = useState();

    useEffect(() => {
        const contents = getContentsSorted(language);
        const content = getContentByPagePath(`/conteudos/${language}/${module}/${title}`);
        setContent(content);
        if (content && contents) {
            const contentsArray = Object.keys(contents);
            setHtmlContent(createCopyCode(content.htmlContent));
            setItems(contentsArray.map((module) => {
                return {
                    key: module,
                    label: module,
                    children: contents[module].map((content) => {
                        return {
                            key: content.title,
                            title: content.title,
                            label: <Link to={`/conteudos/${language}/${content.module}/${content.title}`}>{content.title}</Link>,
                        }
                    })
                }
            }));
            setLoading(false);
        }
    }, [getContentsSorted, getContentByPagePath, language, module, title]);

    useEffect(() => {
        hljs.highlightAll();
        document.querySelectorAll(".copy-code").forEach((button) => {
            button.addEventListener("click", (event) => {
                navigator.clipboard.writeText(event.target.dataset.code);
            });
        });
    }, [content]);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className={styles.layout}>
            {loading ? (
                <Spin
                    indicator={
                    <LoadingOutlined
                        style={{
                        fontSize: 24,
                        }}
                        spin
                    />
                    }
                    fullscreen
                    tip="Carregando..."
                />
            ) : (
                <>
                    <Sider trigger={null} collapsible collapsed={collapsed} width={'20vw'} hidden={collapsed}>
                        <div className="demo-logo-vertical" />
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={content.title}
                            defaultOpenKeys={[content.module]}
                            items={items}
                        />
                    </Sider>
                    <Layout>
                        <Header
                        style={{
                            padding: 0,
                            background: "#000035",
                            color: "white",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingRight: "16px",
                        }}
                        >
                        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                color: 'white',
                                }}
                            />
                            <Link to="/"><h2>JS Almanaque</h2></Link>
                        </div>
                        <SearchBox />
                        </Header>
                        <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                        >
                        <h1>{content.title}</h1>
                        <section style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
                            <h3>{content.module} - {content.language}</h3>
                            <h3>Atualizado por {content.userName} em {new Date(content?.updatedAt.seconds * 1000 + content?.updatedAt.nanoseconds / 1000000).toLocaleString()}</h3>
                        </section>
                        <section style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
                            <div style={{width: '50%'}}>
                                {content?.backPage && (
                                    <Link to={content.backPage} style={{ display: 'inline-block', textAlign: 'center' }}>
                                        <Button type="primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowLeftOutlined /> Conteúdo Anterior</Button>
                                    </Link>
                                )}
                            </div>
                            <div style={{width: '50%', textAlign: 'right'}}>
                                {content?.nextPage && (
                                    <Link to={content.nextPage}>
                                        <Button type="primary">Conteúdo Posterior <ArrowRightOutlined /></Button>
                                    </Link>
                                )}
                            </div>
                        </section>
                        <main dangerouslySetInnerHTML={{__html: `<style>${content.cssContent}</style>${htmlContent}`}}></main>
                        <section style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
                            <div style={{width: '50%'}}>
                                {content?.backPage && (
                                    <Link to={content.backPage}>
                                        <Button type="primary"><ArrowLeftOutlined /> Conteúdo Anterior</Button>
                                    </Link>
                                )}
                            </div>
                            <div style={{width: '50%', textAlign: 'right'}}>
                                {content?.nextPage && (
                                    <Link to={content.nextPage}>
                                        <Button type="primary">Conteúdo Posterior <ArrowRightOutlined /></Button>
                                    </Link>
                                )}
                            </div>
                        </section>
                        </Content>
                    </Layout>
                </>
            )}
        </Layout>
    )
};