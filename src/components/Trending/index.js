import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import FailureView from '../FailureView'
import SavedVideoItem from '../SavedVideoItem'

import ThemeContext from '../../Context/ThemeContext'

import {
  TrendingRoute,
  LoaderContainer,
  VideosList,
  Banner,
  LogoContainer,
  Main,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const getFormatted = data => ({
  id: data.id,
  title: data.title,
  thumbnailUrl: data.thumbnail_url,
  channel: {
    name: data.channel.name,
    profileImageUrl: data.channel.profile_image_url,
  },
  viewCount: data.view_count,
  publishedAt: data.published_at,
})

class Trending extends Component {
  state = {trendingList: []}

  componentDidMount() {
    this.getTrendingList()
  }

  getTrendingList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formattedVideoList = data.videos.map(each => getFormatted(each))
      this.setState({
        apiStatus: apiStatusConstants.success,
        trendingList: formattedVideoList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getTrendingList()
  }

  renderFailure = () => <FailureView onClickRetry={this.onClickRetry} />

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const renderLoader = () => (
            <LoaderContainer className="loader-container" data-testid="loader">
              <Loader
                type="ThreeDots"
                color={isDark ? '#fff' : '#000'}
                height="65"
                width="65"
              />
            </LoaderContainer>
          )

          const renderBanner = () => (
            <Banner isDark={isDark} data-testid="banner">
              <LogoContainer isDark={isDark}>
                <FaFire size={30} color="#ff0000" />
              </LogoContainer>
              <h1 style={{fontSize: '24px'}}>Trending</h1>
            </Banner>
          )

          const renderVideoList = () => {
            const {trendingList} = this.state
            return (
              <div>
                {renderBanner()}
                <VideosList>
                  {trendingList.map(each => (
                    <SavedVideoItem videoDetails={each} key={each.id} />
                  ))}
                </VideosList>
              </div>
            )
          }

          const renderViews = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderVideoList()
              case apiStatusConstants.failure:
                return this.renderFailure()
              case apiStatusConstants.inProgress:
                return renderLoader()
              default:
                return null
            }
          }

          return (
            <Main isDark={isDark} data-testid="trending">
              <Navbar />
              <div style={{display: 'flex'}}>
                <Sidebar />
                <TrendingRoute isDark={isDark}>{renderViews()}</TrendingRoute>
              </div>
            </Main>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
