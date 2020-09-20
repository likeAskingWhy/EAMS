<template>
    <div class="layout-container">
        <Sidebar></Sidebar>
        <div class="right-container">
            <Topbar></Topbar>
            <Tabs></Tabs>
            <Main></Main>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
	import Sidebar from "./components/Sidebar"
	import Topbar from "./components/Topbar"
	import Main from "./components/Main"
	import Tabs from "./components/Tabs"
	import Footer from "./components/Footer"

	export default {
		name: "Layout",
		components: {
			Footer,
			Topbar,
			Sidebar,
			Main,
			Tabs
		}
	}
</script>

<style scoped lang="scss">
    .layout-container {
        display: flex;
        justify-content: space-between;

        .right-container {
            flex: 1;
        }
    }
</style>