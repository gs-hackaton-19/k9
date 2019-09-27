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
import { loadPets, sendQr } from '../../thunks';
import Button from '@material-ui/core/Button';

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
    width: 368,
    height: 'calc(70vh - 16px)',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  card: {
    padding: 16,
    height: 'calc(100% - 32px)',
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
  cardWrapper: {
    height: '80%',
  },
  cta: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 'calc(100% - 477px)',
  },
  ctaButton: {
    pointerEvents: 'initial',
  }
})
export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      leftSwipes: [],
      rightSwipes: [],
      loading: false,
      qrResult: null,
    }

    this.qrInput = React.createRef();
  }

  componentDidUpdate(prevState) {
    if (!prevState.pets || !prevState.pets.length) this.setState({ pets: this.props.pets});
  }

  componentDidMount() {
    this.props.loadPets();
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

    const pet = pets.filter(pet => pet._id === petId)[0]

    this.setState({ leftSwipes: [...leftSwipes, pet], pets: pets.filter(pet => pet._id !== petId) }, () => {
      this.handleSwipeCycle()
    })
  }

  onSwipeRight(petId) {
    const { pets, rightSwipes  } = this.state;

    const pet = pets.filter(pet => pet._id === petId)[0]

    this.setState({ rightSwipes: [...rightSwipes, pet], pets: pets.filter(pet => pet._id !== petId) }, () => {
      this.handleSwipeCycle()
    })
  }

  openQRCamera() {
    const node = this.qrInput.current;
    node.click()
  }

  scanQR() {
    const node = this.qrInput.current;
    const reader = new FileReader();
    reader.onload = () => {
      node.value = "";
      window.qrcode.callback = (res) => {
        if(res instanceof Error) {
          alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
        } else {
          this.props.sendQr(res)
        }
      };
      window.qrcode.decode(reader.result);
    };
    reader.readAsDataURL(node.files[0]);
  }

  render() {
    const { classes, singlePet } = this.props;
    const { pets, rightSwipes } = this.state;

    const myPet = singlePet || (!pets.length && rightSwipes.length === 1 ? rightSwipes[0] : null)
    
    return (
      <div className={classes.wrapper}>
        {this.state.qrResult}
        <input style={{ display: 'none' }} type="file" accept="image/*" capture="environment" ref={this.qrInput} onChange={() => this.scanQR()}/>
        {myPet ? (
          <>
            <Paper className={classes.selectedCard}>
              <Typography variant="h5" component="h3">
                  You selected {myPet.name} as your new pet!
                </Typography>
              <Fab className={classes.ctaButton} color="primary" aria-label="QR" onClick={() => this.openQRCamera()}>
                <CropFreeIcon />
              </Fab>
            </Paper>
          </>
        ) : (
          <>
            <CardWrapper>
              {pets.map((pet, index) => {
                return (
                  <Card 
                    key={pet._id}
                    onSwipeLeft={() => this.onSwipeLeft(pet._id)} 
                    onSwipeRight={() => this.onSwipeRight(pet._id)}
                  >
                    <div className={classes.card}>
                      <div className="image" style={{backgroundImage: `url(${pet.image})`}}></div>
                      <div className="details">
                        <Typography variant="h5" component="h3">
                          {pet.name}
                        </Typography>
                        <div className="left-align">
                          <Typography variant="body1" component="p">
                            <div></div>
                            Species: {pet.species}
                          </Typography>
                          <Typography variant="body1" component="p">
                            Breed: {pet.breed}
                          </Typography>
                          <Typography variant="body1" component="p">
                            Description: {pet.description}
                          </Typography>
                          <Typography variant="body1" component="p">
                            Age: {pet.age}
                          </Typography>
                          <Typography variant="body1" component="p">
                            Sex: {pet.sex}
                          </Typography>
                          <Typography variant="body1" component="p">
                            <a href={`https://www.google.com/maps/search/?api=1&query=${pet.location.coordinates[0]},${pet.location.coordinates[1]}`} target="_blank">Map</a>
                          </Typography>
                          <Typography variant="body1" component="p">
                            Address: {pet.address}
                          </Typography>
                          <Typography variant="body1" component="p">
                            Sex: {pet.sex}
                          </Typography>
                        </div>
                      </div>
                      <div className={classes.cta}>
                        <Button className={classes.ctaButton} variant="contained" color="secondary" onClick={() => this.onSwipeLeft(pet._id)}>
                          Ugly
                        </Button>
                        <Fab className={classes.ctaButton} color="primary" aria-label="QR" onClick={() => this.openQRCamera()}>
                          <CropFreeIcon />
                        </Fab>
                        <Button className={classes.ctaButton} variant="contained" color="primary" onClick={() => this.onSwipeRight(pet._id)}>
                          Cute
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </CardWrapper>
          </>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pets: state.ui.pets,
    singlePet: state.ui.singlePet,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPets,
    sendQr,
  }, dispatch)
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard)

