import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'

import "../styles/index.sass";



const IndexPage = ({ data }) => (
  <>
    <div class="wrapper">
      <div class="sidebar-wrapper">
        <div class="profile-container">
          <img class="profile" src="https://www.gravatar.com/avatar/3f1e138aed35af0b978a9140d29bc067?s=256&d=http%3A%2F%2Fcv.thechoephix.com%2Fassets%2Fimages%2FDSC00884-1.png" alt=""/>
          <h1 class="name">Stefan Ginev</h1>
          <h3 class="tagline">Software Developer</h3>
        </div>

        <div class="contact-container container-block">
          <ul class="list-unstyled contact-list">
            <li class="email"><i class="fas fa-envelope"></i><a href="mailto: choephix@gmail.com">choephix@gmail.com</a></li>
            <li class="phone"><i class="fas fa-phone"></i><a href="tel:+359886791663">+359 886 791-663</a></li>
            <li class="viber"><i class="fab fa-viber"></i><a href="tel:+359886791663">+359 886 791-663</a></li>
            <li class="website"><i class="fas fa-globe"></i><a href="https://sginev.github.io/portfolio" target="_blank">sginev.github.io/portfolio</a></li>
            <li class="github"><i class="fab fa-github"></i><a href="https://github.com/sginev" target="_blank">github.com/sginev</a></li>
            <li class="skype"><i class="fab fa-skype"></i><a href="tel:+359886791663">choephix</a></li>
            <li class="linkedin"><i class="fab fa-linkedin-in"></i><a href="#" target="_blank">linkedin.com/in/alandoe</a></li>
            <li class="twitter"><i class="fab fa-twitter"></i><a href="https://twitter.com/3rdwave_themes" target="_blank">@twittername</a></li>
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
          <div class="summary" dangerouslySetInnerHTML={{ __html: data.general.introductionNode.childMarkdownRemark.html }} />
        </section>

        <section class="section projects-section">
          <h2 class="section-title"><span class="icon-holder"><i class="fas fa-archive"></i></span>Projects</h2>
          <div class="intro">
            <p>I have worked on a number of projects both at the office, and at home. 
              These include games and apps, realized via different technologies for web, android and
              flash (when it was cool). I handle mostly front-end business and visual logic; my back-end work
              consists predominantly of multiplayer server logic, and simple rest api and websites.
            </p>
            <p>
              { 
              //  JSON.stringify( data.general ) 
              }
            </p>
          </div>

          {data.allDatoCmsProject.edges.map(({ node }) => (
            <div key={ node.id } class="item">
              <div class="upper-row">
                <h3 class="job-title">{ node.title }</h3>
              </div>
              <div class="project-tagline" dangerouslySetInnerHTML={{ __html: node.descriptionNode.childMarkdownRemark.html }}>
              </div>
            </div>
          ))}

        </section>

        <section class="section experiences-section">
          <h2 class="section-title"><span class="icon-holder"><i class="fas fa-briefcase"></i></span>Experiences
          </h2>

          {data.allDatoCmsExperience.edges.map(({ node }) => (
            <div key={ node.id } class="item">
              <div class="meta">
                <div class="upper-row">
                  <h3 class="job-title">{ node.title }</h3>
                  <div class="time">{ node.dates }</div>
                </div>
                <div class="company">{ node.jobTitle }</div>
              </div>
              <div class="details" dangerouslySetInnerHTML={{ __html: node.descriptionNode.childMarkdownRemark.html }}>
              </div>
            </div>
          ))}

        </section>

        <section class="section experiences-section">
          <h2 class="section-title"><span class="icon-holder"><i class="fas fa-briefcase"></i></span>Miscellaneous
          </h2>

          <div class="item">
            <div class="details" dangerouslySetInnerHTML={{ __html: data.general.miscellaneousNode.childMarkdownRemark.html }} />
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
  query IndexQuery {
    datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      copyright
    }
    general: datoCmsGeneralInformation {
      introductionNode {
        childMarkdownRemark {
          html
        }
      }
      miscellaneousNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allDatoCmsProject {
      edges {
        node {
          id
          title
          descriptionNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allDatoCmsExperience {
      edges {
        node {
          id
          title
          jobTitle
          dates
          descriptionNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          description
          descriptionNode {
            childMarkdownRemark {
              html
            }
          }
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
