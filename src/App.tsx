import React, { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import './App.css';

import  NavComponent from './components/NavComponent';
import { CardComponent } from './components/CardComponent';
import { CardUserBeFound } from './components/CardUserBeFound';
import { GithubApiCall } from './components/CardComponent';

function App() {
  const navTitle = "Github Friends"

  const [githubData, setGithubData] = useState<GithubApiCall[]>([]);
  const [profileName, setNameProfile] = useState('');
  const [userCouldBeFound, setUserCouldBeFound] = useState(true);

  const githubApiCall = async (userName: string): Promise<GithubApiCall> => {
    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };


  const checkIfUserExist = (dataFromApi: any) => {
    if (dataFromApi.message === 'Not Found') {
      return false;
    }
    return true;
  };

  const setDataToState = () => {
    githubApiCall(profileName).then((dataApi) => {
      if (checkIfUserExist(dataApi)) {
        setGithubData((value) => [...value, dataApi]);
        setUserCouldBeFound(true);
      } else {
        setGithubData([]);
        setUserCouldBeFound(false);
      }
    });
  };

  const handleValueInput = (event: any) => {
    const value = event.target.value.trim();
    setNameProfile(value);
  };

  return (
    <div>

      <NavComponent title={navTitle} />

      <div className='input-button-container'>
        <input
          id='githubProfileName'
          className='input-search'
          type='text'
          required
          onChange={handleValueInput}
        />
        <button className='button-search' onClick={() => setDataToState()}>
          Buscar
        </button>
      </div>

      {userCouldBeFound ? (
        <div>
          <CardComponent githubData={githubData}/>
        </div>
      ) : (
        <CardUserBeFound title="OOOPS..." text="The user could not be found, try again"/>
      )}
    </div>
  );
}

export default App;
