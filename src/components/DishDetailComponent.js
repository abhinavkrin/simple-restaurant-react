import React from 'react';
import  {Card,CardImg,CardText,CardBody,CardTitle, BreadcrumbItem, Breadcrumb}  from 'reactstrap';
import {Link} from 'react-router-dom';
import  {Component} from 'react';
import {Button,Modal,Row, Label, Col, ModalBody, ModalHeader} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform,Fade,Stagger} from 'react-animation-components';
const required = (val)=> val&&val.length;

const maxLength = len => val => !val || val.length<=len;

const minLength = len => val => val && val.length >= len;

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            isModalOpen: false
        }
    }
    
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating, values.author, values.comment);
    }
    render(){
        return (
            <div className="col-12">
                <Modal toggle={()=>this.toggleModal()} isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={()=>this.toggleModal()}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" xs={12}>First Name</Label>
                                <Col xs={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" xs={12}>Your name</Label>
                                <Col xs={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                         }}
                                         >
                                    </Control.text>
                                    <Errors 
                                        className="text-danger" 
                                        model=".author" 
                                        show="touched" 
                                        messages={{
                                            required: 'Required. ',
                                            minLength: 'Must be greater than 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'                                            
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" xs={12}>Comment</Label>
                                <Col xs={12}>
                                    <Control.textarea rows={6} model=".comment" id="comment" name="comment"
                                        className="form-control">
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:12}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline
                 onClick={()=>this.toggleModal()}>
                 <span className="fa fa-pencil-alt fa-lg"></span> Submit Comment
                 </Button>
            </div>
        );
    }
}

function RenderDish({dish}){
    return (
        <FadeTransform in transformProps={
            {
                exitTransform: 'scale(0.5) translateY(-50%)'
            }
        }>
            <Card>
                <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
        
    );
}

function RenderComment({comment}){
    return (
            <li className="col-12">
                <p>{comment.comment}</p>
                <p>&nbsp;&nbsp;--{comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                <hr/>
            </li>
        );
}

function RenderComments({comments,postComment,dishId}){
    const commentsHTML=comments.map(comment=>{
        return (
            <Fade in>
                <RenderComment key={`comment${comment.id}`} comment={comment} />
            </Fade>
        )
    });
    return (
        <React.Fragment>
            <ul className="list-unstyled">
                <Stagger in>
                    {commentsHTML}
                </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </React.Fragment>
    )
}

export default function DishDetail(props){
    if(props.dishesLoading){
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.dishesErrMess){
        return (
            <div className="container">
                <div className="row">
                    <h4 className="text-danger">{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish){
        return (
            <div className="container">
                <div className="row ">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    }else{
        return (<div></div>);
    }
 }