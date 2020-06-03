import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import ResumeSheet from '../components/sheet'

import "../styles/index.sass";
import '@fortawesome/fontawesome';

export default ({ data }) => (
  <div className="desk">

    <ResumeSheet data={ data } />

    <footer class="footer">
      <div class="text-center">
        <small class="copyright">{data.datoCmsHome.copyright}</small>
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
      icon
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
        data
      }
    }
  }
  experiences: allDatoCmsExperience(sort: {fields: dates, order: DESC}) {
    nodes {
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

  datoCmsHome {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
    copyright
  }
}
`
