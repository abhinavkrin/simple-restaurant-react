import React from 'react';
import  {Card,CardImg,CardText,CardBody,CardTitle, BreadcrumbItem, Breadcrumb}  from 'reactstrap';
import {Link} from 'react-router-dom';
function RenderDish({dish}){
    return (

        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComment({comment}){
    return (
            <div className="col-12">
                <p>{comment.comment}</p>
                <p>&nbsp;&nbsp;--{comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                <hr/>
            </div>
        );
}

export default function DishDetail(props){
    if(props.dish){
        const commentsHTML=props.comments.map(comment=>{
            return <RenderComment key={`comment${comment.id}`} comment={comment} />
        });
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
                        <h3>Comments</h3>
                        {commentsHTML}
                    </div>
                </div>
            </div>
        );
    }else{
        return (<div></div>);
    }
 }