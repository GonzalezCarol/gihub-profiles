import React, { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
export interface GithubApiCall {
  avatar_url: string;
  login: string;
  name: string;
  html_url: string;
  followers: string;
  public_repos: string;
  repos_url: string;
}

function App() {
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
      <nav
        className='navbar navbar-light'
        style={{ 'background': '#8663c2', padding:'12px', color:"#FFF" }}
      >
        Github Profile
      </nav>

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
          {githubData.map((value, index) => (
            <div className='infos-container' key={index}>
              <img src={value.avatar_url} />
              <div className='infos'>
                <h3>Display Name</h3>
                <span>{value.login}</span>
                <h3>Name</h3>
                <span>{value.name}</span>
                <h3>URL</h3>
                <span>{value.html_url}</span>
                <h3>Followers</h3>
                <span>{value.followers}</span>
                <h3>Public Repositories</h3>
                <span>{value.public_repos}</span>
                <h3>Repositories URL</h3>
                <span>{value.repos_url}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='alert alert-warning' role='alert'>
          <h4 className='alert-heading'>OOOPS...</h4>
          <hr></hr>
          <p className='mb-0'>
            <p>The user could not be found, try again</p>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
