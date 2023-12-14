import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function PredictionModel() {

    return (    
        <div className="page-body-about">
            <div className="about">
            <h2 style={{marginTop: 40}}>Our Prediction Model</h2>
            <p>Step into the heart of our analytics with the unveiling of our prediction model. This sophisticated tool forecasts the defensive rating of each NBA team by harnessing the collective RPDEF ratings of its players from the preceding season. It's like peering into the future of basketball defense.</p>
            <p>This model isn't just a shot in the dark. For the 2022/23 season, we put it to the test. The absolute mean error—a measure of how closely our predictions aligned with reality—clocked in at an impressive 1.6. This means our model is not just making wild guesses; it's fine-tuned, making predictions with remarkable accuracy.</p>
             <h3>Predicted Defensive Rating vs Actual Defensive Rating for 2022/23</h3>
             <p style={{marginBottom: 40}}>The forecasts for the 2022/23 season were generated prior to the start of the season, incorporating exclusively the data available before the season kicked off.</p>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <TableContainer className="tables" component={Paper}>
                <Table  sx={{ minWidth: 400, '& th, & td': { padding: '8px' } }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Team</TableCell>
                        <TableCell align="center">Predicted DEF RTG</TableCell>
                        <TableCell align="center">Actual DEF RTG</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">BOS</TableCell>
                            <TableCell align="center">108.4</TableCell>
                            <TableCell align="center">110.6</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">GSW</TableCell>
                            <TableCell align="center">109.4</TableCell>
                            <TableCell align="center">113.4</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">MIN</TableCell>
                            <TableCell align="center">110.6</TableCell>
                            <TableCell align="center">113.1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">MEM</TableCell>
                            <TableCell align="center">111.0</TableCell>
                            <TableCell align="center">110.7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">TOR</TableCell>
                            <TableCell align="center">111.2</TableCell>
                            <TableCell align="center">113.1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">MIA</TableCell>
                            <TableCell align="center">111.3</TableCell>
                            <TableCell align="center">112.8</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">ORL</TableCell>
                            <TableCell align="center">112.0</TableCell>
                            <TableCell align="center">113.7</TableCell>
                        </TableRow>                        
                        <TableRow>
                            <TableCell align="center">LAL</TableCell>
                            <TableCell align="center">112.3</TableCell>
                            <TableCell align="center">113.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">BKN</TableCell>
                            <TableCell align="center">112.4</TableCell>
                            <TableCell align="center">113.5</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">MIL</TableCell>
                            <TableCell align="center">112.4</TableCell>
                            <TableCell align="center">110.9</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">NYK</TableCell>
                            <TableCell align="center">112.6</TableCell>
                            <TableCell align="center">114.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">CLE</TableCell>
                            <TableCell align="center">112.9</TableCell>
                            <TableCell align="center">109.9</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">PHX</TableCell>
                            <TableCell align="center">113.0</TableCell>
                            <TableCell align="center">112.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">DEN</TableCell>
                            <TableCell align="center">113.2</TableCell>
                            <TableCell align="center">113.5</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">PHI</TableCell>
                            <TableCell align="center">113.5</TableCell>
                            <TableCell align="center">112.7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">NOP</TableCell>
                            <TableCell align="center">113.5</TableCell>
                            <TableCell align="center">112.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">WAS</TableCell>
                            <TableCell align="center">113.6</TableCell>
                            <TableCell align="center">114.9</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">DAL</TableCell>
                            <TableCell align="center">113.9</TableCell>
                            <TableCell align="center">116.1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">LAC</TableCell>
                            <TableCell align="center">114.0</TableCell>
                            <TableCell align="center">113.6</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">ATL</TableCell>
                            <TableCell align="center">114.4</TableCell>
                            <TableCell align="center">119.5</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">OKC</TableCell>
                            <TableCell align="center">114.4</TableCell>
                            <TableCell align="center">113.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">POR</TableCell>
                            <TableCell align="center">114.6</TableCell>
                            <TableCell align="center">118.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">UTA</TableCell>
                            <TableCell align="center">114.7</TableCell>
                            <TableCell align="center">116.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">CHA</TableCell>
                            <TableCell align="center">114.8</TableCell>
                            <TableCell align="center">114.7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">DET</TableCell>
                            <TableCell align="center">115.2</TableCell>
                            <TableCell align="center">117.8</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">IND</TableCell>
                            <TableCell align="center">115.2</TableCell>
                            <TableCell align="center">117.1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">CHI</TableCell>
                            <TableCell align="center">115.4</TableCell>
                            <TableCell align="center">111.5</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">SAC</TableCell>
                            <TableCell align="center">117.1</TableCell>
                            <TableCell align="center">116.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">SAS</TableCell>
                            <TableCell align="center">117.1</TableCell>
                            <TableCell align="center">119.6</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">HOU</TableCell>
                            <TableCell align="center">119.5</TableCell>
                            <TableCell align="center">118.6</TableCell>
                        </TableRow>                        
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            <h3 style={{marginTop: 40}}>Predicted Defensive Rating vs Actual Defensive Rating for 2023/24</h3>
            <p style={{marginBottom: 40}}>The forecasts for the 2022/23 season were generated prior to the start of the season, incorporating exclusively the data available before the season kicked off.</p>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <TableContainer className="tables" component={Paper}>
                <Table  sx={{ minWidth: 400, '& th, & td': { padding: '8px' } }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Team</TableCell>
                        <TableCell align="center">Predicted DEF RTG</TableCell>
                        <TableCell align="center">Actual DEF RTG</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">BOS</TableCell>
                            <TableCell align="center">108.6</TableCell>
                            <TableCell align="center">109.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">CHI</TableCell>
                            <TableCell align="center">110.8</TableCell>
                            <TableCell align="center">115.6</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">MEM</TableCell>
                            <TableCell align="center">111.5</TableCell>
                            <TableCell align="center">113.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">CLE</TableCell>
                            <TableCell align="center">112.1</TableCell>
                            <TableCell align="center">111.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">BKN</TableCell>
                            <TableCell align="center">112.2</TableCell>
                            <TableCell align="center">114.7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">MIN</TableCell>
                            <TableCell align="center">112.2</TableCell>
                            <TableCell align="center">106.8</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">NYK</TableCell>
                            <TableCell align="center">112.5</TableCell>
                            <TableCell align="center">112.8</TableCell>
                        </TableRow>                        
                        <TableRow>
                            <TableCell align="center">LAL</TableCell>
                            <TableCell align="center">112.6</TableCell>
                            <TableCell align="center">111.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">MIL</TableCell>
                            <TableCell align="center">112.7</TableCell>
                            <TableCell align="center">115.7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">PHI</TableCell>
                            <TableCell align="center">112.9</TableCell>
                            <TableCell align="center">111.9	</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell align="center">GSW</TableCell>
                            <TableCell align="center">113.0</TableCell>
                            <TableCell align="center">113.6</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">NOP</TableCell>
                            <TableCell align="center">113.2</TableCell>
                            <TableCell align="center">113.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">PHX</TableCell>
                            <TableCell align="center">113.6</TableCell>
                            <TableCell align="center">114.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">LAC</TableCell>
                            <TableCell align="center">113.7</TableCell>
                            <TableCell align="center">110.3	</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">OKC</TableCell>
                            <TableCell align="center">113.7</TableCell>
                            <TableCell align="center">110.2	</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">HOU</TableCell>
                            <TableCell align="center">113.7</TableCell>
                            <TableCell align="center">107.8</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">POR</TableCell>
                            <TableCell align="center">113.9</TableCell>
                            <TableCell align="center">113.6</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">ORL</TableCell>
                            <TableCell align="center">114.2</TableCell>
                            <TableCell align="center">108.7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">MIA</TableCell>
                            <TableCell align="center">114.3</TableCell>
                            <TableCell align="center">112.9</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">TOR</TableCell>
                            <TableCell align="center">114.4</TableCell>
                            <TableCell align="center">114.6</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell align="center">UTA</TableCell>
                            <TableCell align="center">114.3</TableCell>
                            <TableCell align="center">118.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">CHA</TableCell>
                            <TableCell align="center">115.1</TableCell>
                            <TableCell align="center">120.7</TableCell>
                        </TableRow>  
                        <TableRow>
                            <TableCell align="center">DEN</TableCell>
                            <TableCell align="center">115.1</TableCell>
                            <TableCell align="center">113.1</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">WAS</TableCell>
                            <TableCell align="center">115.4</TableCell>
                            <TableCell align="center">121.9</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">IND</TableCell>
                            <TableCell align="center">115.5</TableCell>
                            <TableCell align="center">120.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">DAL</TableCell>
                            <TableCell align="center">116.3</TableCell>
                            <TableCell align="center">116.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">ATL</TableCell>
                            <TableCell align="center">116.3</TableCell>
                            <TableCell align="center">114.7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">DET</TableCell>
                            <TableCell align="center">117.1</TableCell>
                            <TableCell align="center">117.7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">SAC</TableCell>
                            <TableCell align="center">117.5</TableCell>
                            <TableCell align="center">115.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">SAS</TableCell>
                            <TableCell align="center">119.5</TableCell>
                            <TableCell align="center">117.4</TableCell>
                        </TableRow>                     
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            </div>

        </div>
    );
}

export default PredictionModel;