import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Player() {

    return (    
        <div>
            <div className="about">
            <h3>What is Rim Perimeter Defensive Factor (RPDEF)?</h3>
            <p>RPDEF is a comprehensive metric that evaluates an individual player's defense and their contribution to the team's defense. The rating takes into account both traditional 
            statistics such as blocks, steals, and charges, as well as location-based data that indicates the player's effectiveness in covering specific areas of the court. 
            The results also depend on the player's contribution to team defense and the overall quality of team defense. RPDEF is divided into two components: 
            the rating of rim protection (RDEF) and the rating of perimeter defense (PDEF). By considering multiple aspects of defense, RPDEF provides a more comprehensive 
            assessment of a player's defensive abilities. Additionally, the incorporation of location-based data enhances the accuracy and insightfulness of the rating.</p>
            <p>RDEF is a rating that evaluates an individual player's defense specifically in the area near the basket, as well as their contribution to the team's defense
             in that same area. It provides valuable insights into a player's effectiveness in defending the basket and their impact on the team's overall 
             defensive performance in that specific area.</p>
             <p>PDEF is a rating that assesses an individual player's defense on the perimeter, focusing on their ability to guard against perimeter shots and 
                prevent opponents from penetrating into the key area. It provides valuable insights into a player's effectiveness in defending the basket and their impact on the team's overall 
             defensive performance in that specific area.</p>
             <h4 style={{marginBottom: 0}}>Comparison with other defensive ratings</h4>
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

export default Player;