// components/HireWiseAbout.js
import React from "react";
import "./HireWiseAbout.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Briefcase, FileText, Send, People} from "react-bootstrap-icons";
import ImageSlider from "../components/imageSlider";
import analyticsImage from "../components/images/analytics.png";


const HireWiseAbout = () => {
  return (
    <div className="hirewise-about-section">
      <Container>
        <h1 className="section-title text-center"><strong>Welcome to HireWise</strong></h1>
        <p className="section-subtitle text-center">
          Revolutionizing recruitment with AI-powered automation
        </p>
        <Row className="mt-5 about-row">
  <Col md={6} className="about-text d-flex flex-column justify-content-center">
  <h1 className="text-center mb-4">What is <span color ="#8f338d">HireWise</span>?</h1>
  <p>
      <strong>HireWise</strong> is a cutting-edge, AI-powered multi-agent recruitment automation system designed to revolutionize the hiring process.
      Leveraging the power of multi-agent collaboration, LLMs, and intelligent workflows, HireWise enables companies to streamline and optimize every stage of recruitment — from job description understanding, CV parsing, and candidate shortlisting to interview scheduling and personalized communication.
    </p>
  </Col>
  <Col md={6} className="d-flex align-items-center justify-content-center">
    <img
      src={analyticsImage}
      alt="About HireWise"
      className="img-fluid rounded shadow"
      style={{ maxHeight: "300px", maxWidth: "100%" }}
    />
  </Col>
</Row>


        <h3 id="services" className="mt-5 text-center" color="#8f338d">Our Services</h3>
        <Row className="mt-4">
          <Col md={3}>
            <Card className="service-card text-center">
              <Card.Body>
                <Briefcase size={20} />
                <Card.Title>JD Summarization</Card.Title>
                <Card.Text>
                  Upload job descriptions and get crisp, AI-generated summaries.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="service-card text-center">
              <Card.Body>
                <FileText size={40} />
                <Card.Title>CV Parsing</Card.Title>
                <Card.Text>
                  Extract candidate details from resumes automatically.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="service-card text-center">
              <Card.Body>
                <People size={40} />
                <Card.Title>Matching Engine</Card.Title>
                <Card.Text>
                  Find the best candidates using our match score algorithm.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="service-card text-center">
              <Card.Body>
                <Send size={40} />
                <Card.Title>Email Scheduling</Card.Title>
                <Card.Text>
                  Send interview invites and follow-ups with one click.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="my-5 px-3">
      <p className="lead text-center mb-5">
      </p>
    </div>
    <div>
    <h3 id="imageslider" className="mt-5 text-center">Analytics</h3>
       <ImageSlider/>
    </div>
      </Container>
    </div>
  );
};

export default HireWiseAbout;
