<template>
	<div class="homepage-hero-module">
		<div class="video-container">

			<div :style="fixStyle" class="filter">
				<Row>
					<Col span="4" offset="10" class="loginForm">
						<Tabs type="card" value="login" @on-click="changeTab">
							<TabPane :label="loginLabel" class="content" name="login">
								<Form ref="login" :model="formInline" :rules="rules">
									<FormItem prop="user">
										<Input type="text" v-model="formInline.user" placeholder="Email Address">
										<Icon type="ios-person-outline" slot="prepend"></Icon>
										</Input>
									</FormItem>
									<br/>
									<FormItem prop="password">
										<Input type="password" v-model="formInline.password" placeholder="Password">
										<Icon type="ios-lock-outline" slot="prepend"></Icon>
										</Input>
									</FormItem>
									<br/>
									<FormItem>
										<Button type="primary" @click="handleSubmit('login')" long>Signin</Button>
									</FormItem>
								</Form>
							</TabPane>
							<TabPane label="Register" class="content" name="register">
								<Form ref="register" :model="formInline" :rules="rules">
									<FormItem prop="user">
										<Input type="text" v-model="formInline.user" placeholder="Email Address">
										<Icon type="ios-person-outline" slot="prepend"></Icon>
										</Input>
									</FormItem>
									<br/>
									<FormItem prop="password">
										<Input type="password" v-model="formInline.password" placeholder="Password">
										<Icon type="ios-lock-outline" slot="prepend"></Icon>
										</Input>
									</FormItem>
									<br/>
									<FormItem>
										<Button type="primary" @click="handleSubmit('register')" long>Signup</Button>
									</FormItem>
								</Form>
							</TabPane>
							<TabPane label="Forget Password" class="content" name="forget">
								<Form ref="register" :model="formInline" :rules="forgetRules">
									<FormItem prop="user">
										<Input type="text" v-model="formInline.user" placeholder="Email Address">
										<Icon type="ios-person-outline" slot="prepend"></Icon>
										</Input>
									</FormItem>
									<br/>
									<FormItem>
										<Button type="primary" @click="handleSubmit('register')" long>Submit</Button>
									</FormItem>
								</Form>
							</TabPane>
						</Tabs>
					</Col>
				</Row>
			</div>

			<video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
				<source src="src/background.mp4" type="video/mp4"/>
					Your browser's not support 'video' elem...
				<source src="src/background.webm" type="video/webm"/>
					Your browser's not support 'video' elem...
			</video>

			<div class="poster hidden" v-if="!vedioCanPlay">
				<img :style="fixStyle" src="src/background.jpg" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'auth',
		data() {
			return {
			    currentTab:'login',
				vedioCanPlay: false,
				fixStyle: '',
				formInline: {
					user: '',
					password: ''
				},
				rules: {
					user: [
						{ 
							required: true, 
							message: 'Email Address required!',
							trigger: 'blur' 
						}
					],
					password: [
						{
							required: true, 
							message: 'Password required!',
							trigger: 'blur'
						},
						{
							type: 'string', 
							min: 6, 
							message: 'Passwords should be 6 or more characters in length',
							trigger: 'blur'
						}
                    ]
                },
				forgetRules: {
                    user: [
                        {
                            required: true,
                            message: 'Email Address required!',
                            trigger: 'blur'
                        }
                    ]
				},
				loginLabel:(h) => {
			        return h('span',{
			            style:{
			                padding:'7px'
						}
					}, 'Login')
				}
			}
		},
		methods: {
			canplay() {
				this.vedioCanPlay = true
			},
			changeTab(tab) {
			    if (this.currentTab !== tab) {
                    this.formInline = {};
				}
				this.currentTab = tab
			},
			handleSubmit(name) {
				this.$Loading.start()
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let api = ''
						let data = {}
                        if ('login' === this.currentTab || 'register' === this.currentTab) {
                            api = 'login' === this.currentTab ? '/login' : '/register'
							data = {
                                email: this.formInline.user,
                                password: this.formInline.password
							}
						} else {
                            api = '/password/email'
							data = {
                                email: this.formInline.user
							}
						}
                    	this.$api.post(api, data, () => {
							this.$Loading.finish()
                    		this.$Message.success('Logged in！')
							this.$router.push({path: '/'})
						}, (err) => {
							this.$Loading.error()
                            this.$Message.error(err.message)
						})
                    } else {
                    	this.$Loading.error()
                    }
                })
            }
		},
		mounted: function() {
			window.onresize = () => {
				const windowWidth = document.body.clientWidth
				const windowHeight = document.body.clientHeight
				const windowAspectRatio = windowHeight / windowWidth
				let videoWidth
				let videoHeight
				if (windowAspectRatio < 0.5625) {
					videoWidth = windowWidth
					videoHeight = videoWidth * 0.5625
					this.fixStyle = {
						height: windowWidth * 0.5625 + 'px',
						width: windowWidth + 'px',
						'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
						'margin-left': 'initial'
					}
				} else {
					videoHeight = windowHeight
					videoWidth = videoHeight / 0.5625
					this.fixStyle = {
						height: windowHeight + 'px',
						width: windowHeight / 0.5625 + 'px',
						'margin-left': (windowWidth - videoWidth) / 2 + 'px',
						'margin-bottom': 'initial'
					}
				}
			}
			window.onresize()
		}
	}
</script>
<style scoped>
	.homepage-hero-module,
	.video-container {
		position: relative;
		height: 100vh;
		overflow: hidden;
	}
	.video-container .poster img,
	.video-container video {
		z-index: 0;
		position: absolute;
	}
	.video-container .filter {
		z-index: 1;
		position: absolute;
		background: rgba(0, 0, 0, 0.4);
	}
	.loginForm {
		text-align: center;
		margin-top: 200px;
	}
	.content {
		padding: 30px;
	}
</style>