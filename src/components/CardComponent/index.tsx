import './card.css'

export interface GithubApiCall {
  avatar_url: string;
  login: string;
  name: string;
  html_url: string;
  followers: string;
  public_repos: string;
  repos_url: string;
}

export interface CardProps {
  githubData: GithubApiCall[]
}

const CardComponent = (props:CardProps) => {
  const {githubData} = props;

  return(
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
  )

};

export { CardComponent };
