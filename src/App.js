/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeturedMovie from './components/FeturedMovie';
import Header from './components/Header';


export default () =>  {
  const [movieList, setMovieList] = useState ([]);
  const [featuredData, setfeatureData] = useState (null);
  const [blackHeader, setblackHeader] = useState (false)
  useEffect(() => {

      const loadAll = async () => {
        //pegando a lista total
        let list = await Tmdb.getHomeList();
        setMovieList(list);

        //pegando o featured
        let originals = list.filter(i=>i.slug === 'originals');
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setfeatureData(chosenInfo);
        console.log(chosenInfo)
      }
      loadAll();
      
  }, [])

  useEffect ( () => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setblackHeader(true);
      }
      else {
        setblackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, [])
  return (
    <div className='page'>
    
    <Header black={blackHeader} />

    { featuredData && 
    <FeturedMovie  item={featuredData}/>}
      <section className='lists'>

        {movieList.map((item, key) =>(
          
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Feito com <span role="img" aria-label='coração'>❤️ </span> <a href='www.github.com/daniel-lins'>Daniel Lins </a> <br/>
      Direitos de imagem para Netflix <br/>
      E dados pego da API do THe Movie DB
       </footer>
        {movieList.length <= 0 &&
       <div className='loading'>
         <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando"></img>
       </div>}
      
    </div>
  );

}
