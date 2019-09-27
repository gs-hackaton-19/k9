// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardWrapper } from 'react-swipeable-cards';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CropFreeIcon from '@material-ui/icons/CropFree';
import Fab from '@material-ui/core/Fab';
import QrScanner from 'qr-scanner'

const styles = theme => ({
  wrapper: {
    textAlign: 'center',
    margin: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#99abbe',
  },
  selectedCard: {
    width: 400,
    height: '70vh',
  },
  card: {
    padding: 16,
    pointerEvents: 'none',
  },
  redCard: {
    height: '100%',
    backgroundColor: '#ef426f',
  },
  greenCard: {
    height: '100%',
    backgroundColor: '#00c7b1',
  },
  blueCard: {
    height: '100%',
    backgroundColor: '#6376ec',
  },
})
export class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      pets: [
        { id: 1, name:'Rasputin' },
        { id: 2, name:'Long Johnson' },
        { id: 3, name:'Phteven' },
      ],
      leftSwipes: [],
      rightSwipes: [],
      loading: false,
    }
  }

  handleSwipeCycle() {
    const { pets, rightSwipes } = this.state;

    if(!pets.length && rightSwipes.length === 1) return null

    if(!pets.length) {
      this.setState({ loading: true })
      setTimeout(() => this.setState({ pets: rightSwipes, leftSwipes: [], rightSwipes: [] }), 1000)
    }
  }

  onSwipeLeft(petId) {
    const { pets, leftSwipes } = this.state;

    const pet = pets.filter(pet => pet.id === petId)[0]

    this.setState({ leftSwipes: [...leftSwipes, pet], pets: pets.filter(pet => pet.id !== petId) }, () => {
      this.handleSwipeCycle()
    })
  }

  onSwipeRight(petId) {
    const { pets, rightSwipes  } = this.state;

    const pet = pets.filter(pet => pet.id === petId)[0]

    this.setState({ rightSwipes: [...rightSwipes, pet], pets: pets.filter(pet => pet.id !== petId) }, () => {
      this.handleSwipeCycle()
    })
  }

  openQRCamera() {
    const node = this.qrInput;
    const reader = new FileReader();
    reader.onload = function() {
      node.value = "";
      window.qrcode.callback = function(res) {
        if(res instanceof Error) {
          alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
        } else {
          node.parentNode.previousElementSibling.value = res;
        }
      };
      window.qrcode.decode(reader.result);
    };
    reader.readAsDataURL(node.files[0]);
  }

  render() {
    const { classes } = this.props;
    const { pets, rightSwipes } = this.state;
    
    return (
      <div className={classes.wrapper}>
        <input type="file" accept="image/*" capture="environment" tabindex="-1" ref={this.qrInput} />
        {!pets.length && rightSwipes.length === 1 ? (
          <>
            <Paper className={classes.selectedCard}>
              <Typography variant="h5" component="h3">
                You selected {rightSwipes[0].name} as your new pet!
              </Typography>
            </Paper>
            <Fab color="primary" aria-label="QR" onClick={() => this.openQRCamera()}>
              <CropFreeIcon />
            </Fab>
          </>
        ) : (
          <>
            <CardWrapper>
              {pets.map((pet, index) => {
                let cardClass;

                if (index % 3 === 0) cardClass = classes.redCard
                if (index % 3 === 1) cardClass = classes.greenCard
                if (index % 3 === 2) cardClass = classes.blueCard

                return (
                  <Card 
                    key={pet.id}
                    onSwipeLeft={() => this.onSwipeLeft(pet.id)} 
                    onSwipeRight={() => this.onSwipeRight(pet.id)}
                  >
                    <div className={classes.card}>
                      <Typography variant="h5" component="h3">
                        {pet.name}
                      </Typography>
                    </div>
                  </Card>
                )
              })}
            </CardWrapper>
            <Fab color="primary" aria-label="QR" onClick={() => this.openQRCamera()}>
              <CropFreeIcon />
            </Fab>
          </>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard)

