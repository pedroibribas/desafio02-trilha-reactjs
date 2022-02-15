import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

/**
 * A aplicação apresenta quatro estados no total: 
 * selectedGenreId, selectedGenre, genres & movies. 
 * O estado compartilhado entre os componentes SideBar e
 * Content - selectedGenreId - é elevado ao componente App, 
 * que é o elemento pai comum mais próximo entre os dois, para 
 * que a modificação desse estado seja refletida nos 
 * dois componentes filhos igualmente. Isso se denomina 
 * 'elevar o estado'.
 */
export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectedGenreId={selectedGenreId} handleClickButton={handleClickButton}/>
      <Content selectedGenreId={selectedGenreId} selectedGenre={selectedGenre}/>
    </div>
  )
}
