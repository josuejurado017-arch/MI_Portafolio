import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import About from '../sections/About';
import Stack from '../sections/Stack';
import Experience, { Stats, Learning } from '../sections/Experience';
import Github from '../sections/Github';
import Contact from '../sections/Contact';

export default function Home() {
  return <><Hero /><Projects /><About /><Stack /><Stats /><Experience /><Github /><Learning /><Contact /></>;
}
