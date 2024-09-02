import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MathJax from 'react-mathjax';

function About() {

    return (    
        <div className="page-body-about">
            <div className="about">
            <h2 style={{marginTop: 40}}>What is Rim Perimeter Defensive Factor (RPDEF)?</h2>
            <p>RPDEF is a comprehensive metric that evaluates an individual player's defense and their contribution to the team's defense. The rating takes into account both traditional 
            statistics such as blocks, steals, and charges, as well as location-based data that indicates the player's effectiveness in covering specific areas of the court. 
            The results also depend on the player's contribution to team defense and the overall quality of team defense. RPDEF is divided into two components: 
            the rating of rim protection (RDEF) and the rating of perimeter defense (PDEF). By considering multiple aspects of defense, RPDEF provides a more comprehensive 
            assessment of a player's defensive abilities. Additionally, the incorporation of location-based data enhances the accuracy and insightfulness of the rating.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='RPDEF = RDEF + PDEF' />
            </div>
            </MathJax.Provider>
            <h3 style={{marginBottom: 0}}>RDEF</h3>
            <p>RDEF is a rating that evaluates an individual player's defense specifically in the area near the basket, as well as their contribution to the team's defense
             in that same area. It provides valuable insights into a player's effectiveness in defending the basket and their impact on the team's overall 
             defensive performance in that specific area.</p>
            <p>The RDEF metric is calculated by adding STOP and PlayerTeam.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='RDEF = STOP + PlayerTeam' />
            </div>
            </MathJax.Provider>
            <p>STOP is obtained from the RBLK or blocks under the basket and the player's DFG coefficient in the zone under the basket.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='STOP = 0.5 \times RBLK  + DFG' />
            </div>
            </MathJax.Provider>
            <p>The DFG coefficient is calculated by finding the best and worst DFG% of the qualified players in the zone under the basket. The player's DFG% is then scaled between the best and worst DFG%, so that the worst DFG% is 0 and the best DFG% is 1. We then scale the player's DFG\% from 0.75 to 1.25 using the calculation below. After scaling, the best player has a DFG of 0.75, the average player has a DFG of 1 and the worst player has a DFG of 0.5.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='DFG = (\frac{MaxDFG\%-DFG\%}{MaxDFG\%-MinDFG\%}) \times 0.5 + 0.75' />
            </div>
            </MathJax.Provider>             
            <p>We get PlayerTeam by multiplying PlayerContribution and TeamRimDefense.</p>           
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='PlayerTeam = PlayerContribution \times TeamRimDefense' />
            </div>
            </MathJax.Provider>  
            <p>PlayerContribution is obtained by calculating the STOP for all qualified players in the team. Then we get the PlayerContribution by calculating the ratio of the player's STOP to the average team STOP.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='PlayerContribution = \frac{STOP}{AverageTeamSTOP}' />
            </div>
            </MathJax.Provider>
            <p>TeamRimDefense is obtained by assigning a defense coefficient to each team. The defense coefficient is obtained from the under-the-basket defense rating of the selected team, and then this rating is scaled from 0.75 to 1.25 according to the team's best and worst rating. This means that the team with the best defense rating has a TeamRimDefense coefficient of 1.25, the worst team has a TeamRimDefense coefficient of 0.75, and the other defenses have a coefficient from 0.75 to 1.25.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='TeamRimDefense = (\frac{WorstRDEF\%-RDEF\%}{WorstRDEF\%-BestRDEF\%}) \times 0.5 + 0.75' />
            </div>
            </MathJax.Provider>
            <p>PlayerTeam assesses how much a player contributes to the team's defense. If a player contributes above average to a below average defense, this rating will be around one, since PlayerContribution will be greater than one and TeamRimDefense coefficient will be less than one. This also means that if a player contributes above average to an above average defense, both numbers will be positive and the PlayerTeam rating will be higher. However, a player who contributes below average to a below average defense will have both metrics less than one, so his final PlayerTeam rating will be low.</p>

            <h3 style={{marginBottom: 0}}>PDEF</h3>
            <p>PDEF is a rating that assesses an individual player's defense on the perimeter, focusing on their ability to guard against perimeter shots and 
                prevent opponents from penetrating into the key area. It provides valuable insights into a player's effectiveness in defending the basket and their impact on the team's overall 
             defensive performance in that specific area.</p>
            <p>The PDEF metric is obtained by adding STOP and PlayerTeam.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='PDEF = STOP + PlayerTeam' />
            </div>
            </MathJax.Provider>
            <p>We get STOP by adding up steals, blocks and charges. Multiply this sum by 0.25 and add the DFG% in the outside zone.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='STOP = 0.25 \times (STL + PBLK + Charges)  + DFG' />
            </div>
            </MathJax.Provider>    
            <p>The DFG coefficient is obtained by finding the best and worst DFG% of the qualified players in the zone away from the basket. The player's DFG% is then placed between the best and worst DFG%, so that the worst DFG% is 0 and the best DFG% is 1. We then scale the player's DFG% from 0.75 to 1.25 using the calculation below. After scaling, the best player has a DFG of 0.75, the average player has a DFG of 1 and the worst player has a DFG of 0.5.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='DFG = (\frac{MaxDFG\%-DFG\%}{MaxDFG\%-MinDFG\%}) \times 0.5 + 0.75' />
            </div>
            </MathJax.Provider>    
            <p>PlayerTeam is calculated by multiplying PlayerContribution and TeamRimDefense.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='PlayerTeam = PlayerContribution \times TeamDefense' />
            </div>
            </MathJax.Provider>    
            <p>We get PlayerContribution by calculating the STOP for all qualified players in the team. Then we get the PlayerContribution by calculating the ratio of the player's STOP to the average team STOP.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='PlayerContribution = \frac{STOP}{AverageTeamSTOP}' />
            </div>
            </MathJax.Provider>    
            <p>TeamDefense is calculated by assigning a defense coefficient to each team. The defense coefficient is obtained from the defense rating of the selected team, and then this rating is scaled from 0.75 to 1.25 according to the best and worst team ratings. This means that the team with the best defense rating has a TeamRimDefense coefficient of 1.25, the worst team has a TeamRimDefense coefficient of 0.75, and the other defenses have a coefficient from 0.75 to 1.25.</p>
            <MathJax.Provider>
            <div>
                <MathJax.Node formula='TeamDefense = (\frac{WorstDEF\%-DEF\%}{WorstDEF\%-BestDEF\%}) \times 0.5 + 0.75' />
            </div>
            </MathJax.Provider>    
            <p>The PlayerTeam assesses how much a player contributes to the team's defense. If a player contributes above average to a below average defense, this rating will be around one, since PlayerContribution will be greater than one and TeamRimDefense coefficient will be less than one. This also means that if a player contributes above average to an above average defense, both numbers will be positive and the PlayerTeam rating will be higher. However, a player who contributes below average to a below average defense will have both metrics less than one, so his final PlayerTeam rating will be low.</p>                                                                        
            
            <h3 style={{marginBottom: 0}}>Comparison with other defensive ratings</h3>
            <p style={{marginTop: 10}}>We compared RPDEF with other widely used defensive metrics that are publicly available. The table illustrates the average percentile of player ratings across different metrics. To evaluate the effectiveness of RPDEF, we assessed all players selected for the All-Defensive teams from the 2013/14 season to the 2022/23 season, calculating their average percentile based on their respective ratings. The results indicate that RPDEF consistently assigns the highest ratings to players chosen for the All-Defensive teams, highlighting its efficacy in identifying top defensive performers.</p>
            <TableContainer className="table-comp" component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">RPDEF</TableCell>
                        <TableCell align="center">DRPM</TableCell>
                        <TableCell align="center">DRAPTOR</TableCell>
                        <TableCell align="center">DRAPM</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        key={"RPDEF"}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">92th</TableCell>
                        <TableCell align="center">83th</TableCell>
                        <TableCell align="center">87th</TableCell>
                        <TableCell align="center">89th</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            </div>

        </div>
    );
}

export default About;