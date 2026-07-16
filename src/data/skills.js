import {
  SiHtml5, SiCss, SiJavascript, SiBootstrap, SiReact,
  SiPython, SiDotnet,
  SiMysql,
  SiGit, SiGithub,
} from 'react-icons/si';
import { BsRobot, BsCpu, BsBraces } from 'react-icons/bs';
import { VscVscode } from 'react-icons/vsc';
import { MdOutlineSchema } from 'react-icons/md';

export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#8B06F5',
    skills: [
      { name: 'HTML5', icon: SiHtml5, level: 90, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, level: 85, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, level: 80, color: '#F7DF1E' },
      { name: 'Bootstrap', icon: SiBootstrap, level: 78, color: '#7952B3' },
      { name: 'React', icon: SiReact, level: 72, color: '#61DAFB' },
    ],
  },
  {
    id: 'programming',
    label: 'Programming',
    color: '#00E5FF',
    skills: [
      { name: 'Python', icon: SiPython, level: 75, color: '#3776AB' },
      { name: 'C#', icon: SiDotnet, level: 65, color: '#239120' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    color: '#8B06F5',
    skills: [
      { name: 'SQL Server', icon: SiMysql, level: 70, color: '#CC2927' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & GenAI',
    color: '#00E5FF',
    skills: [
      { name: 'Prompt Engineering', icon: BsRobot, level: 82, color: '#00E5FF' },
      { name: 'Generative AI', icon: BsCpu, level: 75, color: '#8B06F5' },
      { name: 'AI APIs', icon: BsBraces, level: 70, color: '#412991' },
    ],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    color: '#8B06F5',
    skills: [
      { name: 'Git', icon: SiGit, level: 80, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, level: 82, color: '#F5F5F5' },
      { name: 'VS Code', icon: VscVscode, level: 90, color: '#007ACC' },
    ],
  },
];
