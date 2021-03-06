import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql, Link } from 'gatsby'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

import Img from 'gatsby-image'
import Layout from '../components/Layout'
import RelativeCase from '../components/Work/RelativeCases'
import RelativeCaseMobile from '../components/Work/RelativeCasesMobile'

import Vimeo from '@u-wave/react-vimeo'

import ReactDOM from 'react-dom'
import Modal from 'react-modal'

import FullscreenIcon from './img/fullscreen.svg'
import ScrollArrow from './img/scroll-arrow.svg'

import Infographics from './Infographics'

import FooterWrapper from '../components/Footer'
import userConfig from '../../config'

import CaseStudyStyle from './CasestudyStyle'
import './CasestudyStyle.css'


export default CaseStudy => {
	
	const singleCaseStudy = CaseStudy.data.wordpressWpCasestudy
	
	let firstImage, secondLandscapeImage, caseStudyGallery, rightImage = false
	
	if (singleCaseStudy.acf.first_image && singleCaseStudy.acf.first_image.source_url ) {
    	firstImage = singleCaseStudy.acf.first_image.source_url;
  	}
  	if (singleCaseStudy.acf.second_landscape_image && singleCaseStudy.acf.second_landscape_image.source_url ) {
secondLandscapeImage = singleCaseStudy.acf.second_landscape_image.localFile.childImageSharp.fluid.src; 
    	//secondLandscapeImage = singleCaseStudy.acf.second_landscape_image.source_url;   	
  	}
  	if (singleCaseStudy.acf.case_study_gallery ) {
    	caseStudyGallery = singleCaseStudy.acf.case_study_gallery;
  	}
  	
  	if (singleCaseStudy.acf.right_corner_image_info && singleCaseStudy.acf.right_corner_image_info.source_url ) {
    	rightImage = singleCaseStudy.acf.right_corner_image_info.source_url;
  	}
  	
  	const parallaxStyle = {
	  backgroundImage: `url(${secondLandscapeImage})`,
	
	  height: `675px`,
	
	  backgroundAttachment: `fixed`,
	  backgroundPosition: `center`,
	  backgroundRepeat: `no-repeat`,
	  backgroundSize: `cover`
  	}
  	const noParallaxStyle = {
	  backgroundImage: `url('https://picsum.photos/1920/675.jpg')`,
	
	  height: `675px`,
	
	  backgroundAttachment: `fixed`,
	  backgroundPosition: `center`,
	  backgroundRepeat: `no-repeat`,
	  backgroundSize: `cover`
  	}  	
  	
  	const customStyles = {
	  content : {
	    top                   : '0',
	    left                  : '0',
	    right                 : 'auto',
	    bottom                : 'auto',
	    border: '0',
	    background: 'transparent',
	    overflow: 'hidden',
	    borderRadius: '0',
	    padding: '0',
	    width: '100%',
	    height: '100%'
	  }
	};
	
	const [modalIsOpen,setIsOpen] = React.useState(false);
	function openModal() {
    	setIsOpen(true);
  	}
	function closeModal(){
    	setIsOpen(false);
  	}
  	
  		
	return (
		<Layout>
	      	
		  	<Helmet title={`${singleCaseStudy.title} | ${userConfig.title}`}>
	        	<meta name="description" content={`${singleCaseStudy.content}`}/>
				<body className={"single casestudy xtrademark" + " "+ singleCaseStudy.title} />
			</Helmet>
			<CaseStudyStyle className="caseStudyTop">
		      	<section className="hero">
		      		<div className="columns is-vcentered is-marginless casestudyHeader">
						<div className="column is-7 is-paddingless" style={{position:`relative`}}>
							
							{firstImage ? (
								<div>
								{/*<img className="hideMe" src={singleCaseStudy.acf.first_image.source_url} alt={singleCaseStudy.acf.client_name} /> */}
								<Img className="hideMe" 
								fluid ={singleCaseStudy.acf.first_image.localFile.childImageSharp.fluid}
								alt={singleCaseStudy.acf.client_name}
								/>
								
								
								<div id="vimeoVideo">
						      	<Vimeo 
						      		id="Vmo"
						      		video={singleCaseStudy.acf.video_url} 
							  		autoplay={true}
							  		autopause={true}
							  		muted 
							  		loop={true}
							  		controls={false}
						      	/>
						      </div></div>								
							) :
							<div>
							<img className="hideMe" src="https://via.placeholder.com/1193x1220.png?text=No+Video+Fallback+Image+Found" alt={singleCaseStudy.acf.client_name} />
								<div id="vimeoVideo">
									<Vimeo 
							      		video={singleCaseStudy.acf.video_url} 
								  		autoplay={true}
								  		autopause={true}
								  		muted 
								  		loop={true}
								  		controls={false}
							      	/>
							      </div>
						      </div>
							}
						</div>
						<div className="column is-4 has-text-left client-details">
							<h2 className="casestudyTitle" dangerouslySetInnerHTML={{ __html: singleCaseStudy.title}}/>
						  	
						  	<em>Project</em>
						  	<h3 className="event-name">{singleCaseStudy.acf.project_event_name}</h3>
						  	
						  	<p className="case-study-category">
						  	  {singleCaseStudy.acf.client_category.map((categoryName, n) => (
							  	<span key={n}>{categoryName.value} </span>
							  ))}
							</p>
						  	
						  	<div dangerouslySetInnerHTML={{ __html: singleCaseStudy.content }} />
					      
					  	 <div style={{paddingTop: `1.5rem`}}>
					  	 	<div className="watch-video has-text-left-fullhd has-text-left-widescreen has-text-left-desktop has-text-left-tablet has-text-centered-mobile">
					  	 	<a onClick={openModal}>Full Screen Video <img src={FullscreenIcon} alt="FullscreenIcon" width="20" height="20" style={{verticalAlign: `middle`, marginLeft: `15px`}}/></a>
					  	 	</div>
					  	 	
					  	 	<Modal
					          isOpen={modalIsOpen}
					          onRequestClose={closeModal}
					          style={customStyles}
					        >
					  	 	<div className="fullsizedVideo">
					  	 	<Vimeo 
					      		video={singleCaseStudy.acf.video_url} 
						  		autoplay={true}
						  		autopause={true}
						  		loop={true}
						  		controls={true}
					      	/>
					  	 	</div>
					  	 	<a onClick={closeModal}> <img src={FullscreenIcon} alt="FullscreenIcon" width="20" height="20" style={{position:`absolute`, right:`10px`, bottom:`10px`, zIndex:`10`}}/></a>
					  	 	</Modal>
					  	 </div>									
						
						</div> {/*end column */}
					</div> {/*end columns */}
				</section> {/*end section*/}
				
				{/* Scroll for full case study*/}
				<section className="scroller-section">
					<div className="columns">
						<div className="column is-7"></div>
						<div className="column is-4 scroller-wrapper">
							<div className="scroller"><a href="#nextSection"><img className="scrollArrow" src={ScrollArrow} /></a> Scroll for full case study</div>
						</div>
					</div>
				</section>
				
				
				<section className="has-background-none" id="nextSection">	
					
						{secondLandscapeImage ? (
							<div className="parallax" style={parallaxStyle}></div>
						) :
							<div className="noParallax" style={noParallaxStyle}></div>
						}
				</section>{/*end section*/}
					
				<section className="has-background-green hero is-small" 
					style={{backgroundColor: `${singleCaseStudy.acf.background_color_info}`, position:`relative` }}>
					<div className="hero-body">
						<div className="container">
							<div className="columns infographics is-multiline is-mobile">
								<div className="column is-narrow has-border-left has-border-right">
									<em>Client:</em>
									<div>{singleCaseStudy.acf.client_name}</div>
								</div>
								<div className="column is-narrow has-border-right">
									<em>Event:</em>
									<div>{singleCaseStudy.acf.project_event_name}</div>
								</div>
								<div className="info-location column is-narrow has-border-right">
									<em>Location:</em>
									<div>{singleCaseStudy.acf.location}</div>
								</div>
								<div className="column is-narrow has-border-right">
									<em>Venue:</em>
									<div>{singleCaseStudy.acf.venue}</div>
								</div>
							</div>
								
							<div className="infographics-info">
								<Infographics info={singleCaseStudy} />
							</div>
						</div>
					</div>
					<div className="rightSideImage">
					{rightImage ? (
						<Img
						fluid={singleCaseStudy.acf.right_corner_image_info.localFile.childImageSharp.fluid} alt="" />
					): null }
					
				</div>
				</section> {/*end section*/}
				
				<section className="has-background-white hero is-medium gallery">
					<div className="hero-body">
						<div className="container">
							{caseStudyGallery ? (						
								<div className="slide-container">
							        <Carousel showThumbs={false} useKeyboardArrows={true} autoPlay={true} infiniteLoop={true}>
							          {singleCaseStudy.acf.case_study_gallery.map((each, index)=> (
							            <Img 
							            	key={index}
											fluid ={each.localFile.childImageSharp.fluid}
											alt={each.client_name}
							            />
							          ))}
							        </Carousel>
							        <Carousel className="captionTxt" showThumbs={false} useKeyboardArrows={false} autoPlay={true} infiniteLoop={true} showArrows={false} showIndicators={false} showStatus={false}>
							          {singleCaseStudy.acf.case_study_gallery.map((each, index)=> (
							         <div key={index} className="columns is-vcentered has-text-left">
							         	<div className="column is-3 has-text-right-desktop has-text-left-tablet has-text-left-mobile firstColumn">
							         		<h6>Lorem ipsum dolor</h6>
							         		<p>Lorem ipsum</p>
							         	</div>
							         	<div className="column is-5 has-text-left-desktop has-text-left-tablet has-text-left-mobile">
							         		<p>Lorem ipsum dolor sit amet consectuer adispicing elit, nonummy consequat.</p>
							         	</div>
							         </div>
							            
							          ))}
							        </Carousel>
							    </div>
							    ) :
							    <section className="hero is-small is-bold">
							      <div className="hero-body" style={{paddingBottom: `7rem`}}>
							          <h2 className="has-text-centered" style={{color: `#000`}}>No images are found!!</h2>
							      </div>
							    </section>
							}
						</div>
					</div>
				</section> {/*end section*/}
				
				<section className="has-background-yellow hero is-medium rel-article">
					<div className="hero-body">
						<div className="container">
							<div className="related-article">
								<div className="is-hidden-mobile">
									<RelativeCase />
								</div>
								<div className="is-hidden-tablet">
									<RelativeCaseMobile />
								</div>
								<div className="relatedTxt">Related</div>
							</div>
						</div>
					</div>
				</section> {/*end section*/}
					
						      	
			</CaseStudyStyle>
	      <FooterWrapper />
		</Layout>
	)
}

export const query = graphql`
	query ($slug: String) {
	  wordpressWpCasestudy(slug: { eq: $slug }) {
	    content
	    title
	    slug
	    acf {
	      client_name
	      location
	      venue
	      project_event_name
	      video_url
	      extra_text_box_testimonial
	      another_brand_big_text
	        another_brand_label
	        another_brand_small_text
	        background_color_info
	        brand_activation_big_text
	        brand_activation_label
	        brand_activation_small_text
	        brand_activation_image {
	          source_url
	        }
	        description_info
	        heading_info
	        image_caption_info
	        images_three_and_four_description
	        info_one
	        info_two
	        venue_or_anything_number_information_small_text
	        venue_or_anything_number_information
	        venue_or_anything_label
	        venue_number_info
	        venue__logistics_label
	        right_corner_image_info {
	          source_url
	          localFile {
	            childImageSharp {
	              fluid(maxWidth: 1000, quality: 100) {
	                ...GatsbyImageSharpFluid
	              }
	            }
	          }
	        }
	        portrait_image_small_text
	        portrait_image_heading
	        logistics_small_text
	        logistics_label
	        logistics_image{
		        source_url
	        }
	        logistics_big_text
	        image_title_one_info
	        image_two_info {
	          source_url
	          localFile {
	            childImageSharp {
	              fluid(quality: 100) {
	                ...GatsbyImageSharpFluid
	              }
	            }
	          }
	        }
	        image_three_portrait {
	          source_url
	          localFile {
	            childImageSharp {
	              fluid(maxWidth: 1000, quality: 100) {
	                ...GatsbyImageSharpFluid
	              }
	            }
	          }
	        }
	        image_three_info {
	          source_url
	          localFile {
	            childImageSharp {
	              fluid(maxWidth: 1000, quality: 100) {
	                ...GatsbyImageSharpFluid
	              }
	            }
	          }
	        }
	        info_three_image {
	          source_url
	        }
	        image_one_info {
	          source_url
	        }
	        image_four_info {
	          source_url
	          localFile {
	            childImageSharp {
	              fluid(maxWidth: 1000, quality: 100) {
	                ...GatsbyImageSharpFluid
	              }
	            }
	          }
	        }
	        another_brand_right_image{
		        source_url
	        }
	        extra_image_one{
		        source_url
	        }
	        extra_image_two{
		        source_url
	        }
	      first_image{
		    alt_text
		    id
		    source_url
		    localFile {
	            childImageSharp {
	              fluid(maxWidth: 1193, quality: 100) {
	                ...GatsbyImageSharpFluid
	              }
	            }
	          }  
	      }
	      second_landscape_image{
		    alt_text
		    id
		    source_url
		    localFile {
	            childImageSharp {
	              fluid(maxWidth: 1920, quality: 100, jpegProgressive: true) {
		              srcWebp
		              src
	                ...GatsbyImageSharpFluid
	              }
	            }
	        }
	      }
	      case_study_gallery{
		    source_url
		    localFile {
	            childImageSharp {
	              fluid(maxWidth: 1416, quality: 100) {
	                ...GatsbyImageSharpFluid
	              }
	            }
	        }  
	      }
	      client_category {
	        label
	        value
	      }
	    }
	  }
	}	
`;