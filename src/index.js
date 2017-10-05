import Vue from 'vue';
import ZanDoc from './ZanDoc.vue';
import Nav from './component/Nav.vue';
import Block from './component/Block.vue';
import Header from './component/Header.vue';
import Footer from './component/Footer.vue';
import Content from './component/Content.vue';
import Container from './component/Container.vue';
import FooterNav from './component/FooterNav.vue';
import Simulator from './component/Simulator.vue';
import DemoBlock from './component/DemoBlock.vue';
import DropdownMenu from './component/DropdownMenu.vue';

const components = [Nav, Header, Footer, ZanDoc, Block, Content, Container, FooterNav, Simulator, DemoBlock, DropdownMenu];

export default function install() {
  components.map(Component => {
    Vue.component(Component.name, Component);
  });
}
