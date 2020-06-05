//import { Link, graphql } from 'gatsby'
import { graphql } from 'gatsby'
import React from 'react'
import ResumeSheet from '../components/sheet'
import { HelmetDatoCms } from "gatsby-source-datocms"

import '@fortawesome/fontawesome';
import "../styles/index.sass";

export default ({ data }) => (
  <div className="desk">
    <HelmetDatoCms seo={ data.core.seoMetaTags } />
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
      visible
    }
  }
  skills: allDatoCmsSkill(sort: {order: ASC, fields: position}) {
    nodes {
      id
      label
      faIcon
      href
      note
      confidence
      priority
      categories
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
          ...GatsbyDatoCmsSizes
        }
      }
      links {
        id
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
        fluid(maxHeight: 80, imgixParams: {fm: "jpg", auto: "compress", h:"80"}) {
          src
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
  theme: datoCmsTheme(name: {eq: "pro-long"}) {
    name
    showEducation
    sections
    profilePicture {
      fluid(maxWidth: 256, imgixParams: {fm: "jpg", auto: "compress", w:"256"}) {
        src
        width
        height
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
