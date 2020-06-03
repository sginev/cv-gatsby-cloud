import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'

import "../styles/index.sass";
import '@fortawesome/fontawesome';

const IndexPage = ({ data }) => (
  <>
    <div class="wrapper">
      <div class="sidebar-wrapper">
        <div class="profile-container">
          <img class="profile" src="https://www.gravatar.com/avatar/3f1e138aed35af0b978a9140d29bc067?s=256&d=http%3A%2F%2Fcv.thechoephix.com%2Fassets%2Fimages%2FDSC00884-1.png" alt=""/>
          <h1 class="name">{data.general.firstName} {data.general.lastName}</h1>
          <h3 class="tagline">{data.general.professionalTitle}</h3>
        </div>

        <div class="contact-container container-block">
          <ul class="list-unstyled contact-list">
          {
            data.contactDetails.nodes.map( o => <li><i class={ "fas " + o.icon }></i><a href={ o.href }>{ o.label }</a></li> )
          }
          </ul>
        </div>

        <div class="languages-container container-block">
          <h2 class="container-block-title">Languages</h2>
          <ul class="list-unstyled interests-list">
            <li><a href='https://certs.duolingo.com/qbgyunmd'>English
                <span class="lang-desc">(Duolingo Cert)</span></a>
            </li>
          </ul>
        </div>

        <div class="interests-container container-block">
          <h2 class="container-block-title">Technologies</h2>
          <ul class="list-unstyled interests-list">
            <li>Unity3D</li>
            <li>Node.js / Express.js</li>
            <li>Three.js (3D engine)</li>
            <li>Phaser</li>
            <li>C# .NET</li>
            <li>Python</li>
            <li>Typescript</li>
            <li>React, Angular, CSS3</li>
            <li>Google Firebase</li>
            <li>Adobe Photoshop</li>
            <li>Docker</li>
            <li>Java</li>
          </ul>
        </div>

        <div class="education-container container-block">
          <h2 class="container-block-title">Education</h2>
          <div class="item">
            <h4 class="degree">Computer Science</h4>
            <h5 class="meta">TU Varna</h5>
            <div class="time">2007 - 2011</div>
          </div>
        </div>

      </div>

      <div class="main-wrapper">

        <section class="section summary-section">
          <h2 class="section-title"> <span class="icon-holder"><i class="fas fa-user"></i></span> Career Profile </h2>
          <div class="summary" dangerouslySetInnerHTML={{ __html: data.general.introduction }} />
        </section>

        <section class="section projects-section">
          <h2 class="section-title"><span class="icon-holder"><i class="fas fa-archive"></i></span>Projects</h2>
          <div class="intro" dangerouslySetInnerHTML={{ __html: data.general.projectsPrologue }} />

          {data.projects.nodes.map( node => (
            <div key={ node.id } class="item">
              <div class="upper-row">
                <h3 class="job-title">{ node.title }</h3>
              </div>
              <div class="project-tagline" dangerouslySetInnerHTML={{ __html: node.summary }}>
              </div>
            </div>
          ))}

        </section>

        <section class="section experiences-section">
          <h2 class="section-title"><span class="icon-holder"><i class="fas fa-briefcase"></i></span>Experiences
          </h2>

          {data.experiences.nodes.map( node  => (
            <div key={ node.id } class="item">
              <div class="meta">
                <div class="upper-row">
                  <h3 class="job-title">{ node.title }</h3>
                  <div class="time">{ node.dates }</div>
                </div>
                <div class="company">{ node.jobTitle }</div>
              </div>
              <div class="details" dangerouslySetInnerHTML={{ __html: node.description }}>
              </div>
            </div>
          ))}

        </section>

        <section class="section experiences-section">
          <h2 class="section-title"><span class="icon-holder"><i class="fas fa-briefcase"></i></span>Miscellaneous
          </h2>

          <div class="item">
            <div class="details" dangerouslySetInnerHTML={{ __html: data.general.miscellaneous }} />
          </div>

        </section>

      </div>
    </div>

    <footer class="footer">
      <div class="text-center">
        <small class="copyright">{data.datoCmsHome.copyright}</small>
      </div>
    </footer>
  </>
)

export default IndexPage

export const query = graphql`
query IndexQueryCopy {
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
  contactDetails: allDatoCmsContactdetail {
    nodes {
      id
      typelabel
      label
      href
      icon
      #visible
    }
  }
  projects: allDatoCmsProject {
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
  experiences: allDatoCmsExperience {
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
