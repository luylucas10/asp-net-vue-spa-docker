<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld :msg="msg" />
		{{msg}}
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'

	export default {
		name: 'HomeView',
		components: {
			HelloWorld
		},
		data() {
			return {
				msg: 'carregando mensagem...',
			}
		},
		async mounted() {
			let msg = await fetch("/api/home/index");
			let json = await msg.json()
			this.msg = json.message;
		}
	}
</script>
