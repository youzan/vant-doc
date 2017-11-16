import Vue from 'vue';
import VanDoc from './VanDoc';
import Nav from './component/Nav';
import Block from './component/Block';
import Header from './component/Header';
import Footer from './component/Footer';
import Content from './component/Content';
import Container from './component/Container';
import FooterNav from './component/FooterNav';
import Simulator from './component/Simulator';
import DemoBlock from './component/DemoBlock';
import DemoSection from './component/DemoSection';

const components = [
  Nav,
  Header,
  Footer,
  VanDoc,
  Block,
  Content,
  Container,
  FooterNav,
  Simulator,
  DemoBlock,
  DemoSection
];

export default function install() {
  components.map(Component => {
    Vue.component(Component.name, Component);
  });
}

export {
  Nav,
  Header,
  Footer,
  VanDoc,
  Block,
  Content,
  Container,
  FooterNav,
  Simulator,
  DemoBlock,
  DemoSection
};
