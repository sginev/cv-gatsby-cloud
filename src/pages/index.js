import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import ResumeSheet from '../components/sheet'
import { HelmetDatoCms } from "gatsby-source-datocms"

import "../styles/index.sass";
import '@fortawesome/fontawesome';

    //<HelmetDatoCms seo={ data.core.seoMetaTags } />
export default ({ data }) => (
  <div className="desk">
    
    
    <ResumeSheet data={ data } />

    <footer className="footer">
      <div className="text-center">
        <small className="copyright">{data.core.copyright}</small>
      </div>
    </footer>

  </div>
)

export const query = graphql`
query IndexQuery {
  general: datoCmsGeneralInformation {
    firstName
    lastName
    professionalTitle
    introduction
    projectsPrologue
    miscellaneous
    languages
    skillsList
    education
  }
  contactDetails: allDatoCmsContactdetail(sort: {order: ASC, fields: position}) {
    nodes {
      id
      typelabel
      label
      href
      faIcon
    }
  }
  projects: allDatoCmsProject(sort: {order: ASC, fields: position}) {
    nodes {
      id
      title
      seoTitle
      summary
      description
      tags
      priority
      cover {
        fluid(maxWidth: 960, imgixParams: {fm: "jpg", auto: "compress"}) {
          src
        }
      }
      links {
        label
        url
        linkType
      }
    }
  }
  experiences: allDatoCmsExperience(sort: {fields: dates, order: DESC}) {
    nodes {
      id
      title
      jobTitle
      dates
      description
      logo {
        fluid(maxWidth: 960, imgixParams: {fm: "jpg", auto: "compress"}) {
          src
        }
      }
    }
  }
  theme: datoCmsTheme(name: {eq: "pro-long"}) {
    name
    profilePicture {
      fluid(maxWidth: 256, imgixParams: {fm: "jpg", auto: "compress"}) {
        src
        width
        height
        ...GatsbyDatoCmsSizes
      }
    }
  }
  theme_default: datoCmsTheme(name: {eq: "default"}) {
    name
    profilePicture {
      fluid(imgixParams: {fm: "jpg", auto: "compress", w: "256"}) {
        src
        ...GatsbyDatoCmsSizes
      }
    }
  }

  core: datoCmsHome {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
    copyright
  }
}
`
