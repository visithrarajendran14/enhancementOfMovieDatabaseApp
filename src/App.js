import {Component} from 'react'

const API_KEY = '3e37e3d97d2cf00bcf5dc67ca725e2e1'

class App extends Component {
  state = {moviesList: [], searchInput: '', page: 1, activeCategory: 'popular'}

  componentDidMount() {
    this.getMovies('popular', 1)
  }

  getMovies = (category, page) => {
    // page ah odane update pannidrom, fetch ku wait panna vendaam
    this.setState({page: page, activeCategory: category})

    let url = ''
    if (category === 'popular') {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    } else if (category === 'top_rated') {
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    } else if (category === 'upcoming') {
      url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    } else if (category === 'search') {
      const {searchInput} = this.state
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({moviesList: data.results || []})
      })
  }

  onNextPage = () => {
    const {page, activeCategory} = this.state
    this.getMovies(activeCategory, page + 1)
  }

  onPrevPage = () => {
    const {page, activeCategory} = this.state
    if (page > 1) {
      this.getMovies(activeCategory, page - 1)
    }
  }

  render() {
    const {moviesList, searchInput, page} = this.state
    return (
      <div>
        <h1>movieDB</h1>
        <h1>Popular</h1>
        <h1>Top Rated</h1>
        <h1>Upcoming</h1>

        <button type="button" onClick={() => this.getMovies('popular', 1)}>
          Popular
        </button>
        <button type="button" onClick={() => this.getMovies('top_rated', 1)}>
          Top Rated
        </button>
        <button type="button" onClick={() => this.getMovies('upcoming', 1)}>
          Upcoming
        </button>

        <input
          type="text"
          value={searchInput}
          onChange={event => this.setState({searchInput: event.target.value})}
        />
        <button type="button" onClick={() => this.getMovies('search', 1)}>
          Search
        </button>

        <ul>
          {moviesList.map(movie => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
              <p>{movie.vote_average}</p>
              <button type="button">View Details</button>
            </li>
          ))}
        </ul>

        <div>
          <button type="button" onClick={this.onPrevPage} disabled={page === 1}>
            Prev
          </button>
          <p>{page}</p>
          <button type="button" onClick={this.onNextPage}>
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default App
