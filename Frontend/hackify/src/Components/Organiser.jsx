import { CleaningServices } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  text-align: center;
  padding: 3rem 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffc107; /* Replaced props.theme.colors.accent */
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #333333; /* Replaced props.theme.colors.textPrimary */
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const HeroButton = styled.button`
  padding: 1rem 2rem;
  background-color: #007bff; /* Replaced props.theme.colors.buttonBackground */
  color: #333333; /* Replaced props.theme.colors.textPrimary */
  border: none;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3; /* Replaced props.theme.colors.buttonHover */
    color: #222222;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background-color: #007bff; /* Replaced props.theme.colors.buttonBackground */
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  text-align: left;
`;

const CardTitle = styled.h3`
  color: #ffc107; /* Replaced props.theme.colors.accent */
  margin-bottom: 1rem;
`;

const CardButton = styled(HeroButton)`
  width: 100%;
`;

function Organiser() {
  console.log('hi 123');
  return (
    <HeroSection>
      <Title>Run better public and internal hackathons</Title>
      <Subtitle>
        Plan and manage your hackathons easily with Devpost's all-in-one software, services, and community.
      </Subtitle>
      <ButtonContainer>
        <Card>
          <CardTitle>HACKIFY</CardTitle>
          <p>Get your tools in the hands of developers around the world with Devpost.</p>
          <CardButton>Host public hackathons</CardButton>
        </Card>
        <Card>
          <CardTitle>HACKIFY FOR TEAMS</CardTitle>
          <p>Drive employee and customer innovation in less time with Devpost for Teams.</p>
          <CardButton>Host internal hackathons</CardButton>
        </Card>
      </ButtonContainer>
    </HeroSection>
  );
}

export default Organiser;
