import React, { Component } from 'react'
import { Form, Input, Button, Icon } from "antd";
import logo from './logo.png';
import "./index.less";

const { Item } = Form;

// @Form.create()
class Login extends Component {
        validator = (rule, value, callback) => {
            if (!value){
                callback("请输入密码");                                                          
            }else if(value.length < 4){
                callback("密码长度至少大于4位");
            }else if(value.length > 13){
                callback("密码长度不能大于13位");
            }else if(!/\w/.test(value)){
                callback("密码只能包括英文、数字");
            }else {
                callback();
            }
        };
        render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                <img src={logo} alt="logo"/>
                <h1>React后台管理系统</h1>
                </header>
                <section className="login-section">
                    <h3>用户登录</h3>
                    <Form>
                        <Item>
                        {getFieldDecorator("username",{
                            rules:[ { required:true,message: "请输入用户名" },
                            {
                                min:4,message:'用户名长度至少大于4位'
                            },
                            {
                                max:7,message:'用户名不能超过7位'
                            },
                            {
                                pattern: /\w/,message:'用户名只能包括英文、数字和下划线'
                            }
                        ]
                        })(
                                <Input 
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0, .25)'}} />}
                                placeholder="用户名"
                                />
                            )}
                        </Item>
                        <Item>
                                {getFieldDecorator("password",{
                                    rules: [
                                        { validator: this.validator }
                                    ]
                                })(
                                        <Input 
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0, .25)'}} />}
                                placeholder="密码"
                                />
                                    )
                                }
                        </Item>
                        <Item>
                        <Button type="primary" className="login-btn">登录</Button>
                        </Item>
                        
                    </Form>
                </section>

            </div>
        )
    }
}


export default Login;
