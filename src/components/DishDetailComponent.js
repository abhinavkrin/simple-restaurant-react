import React from 'react';
import  {Card,CardImg,CardText,CardBody,CardTitle}  from 'reactstrap';

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
            <div key={`comment${comment.id}`} className="col-12">
                <p>{comment.comment}</p>
                <p>&nbsp;&nbsp;--{comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                <hr/>
            </div>
        );
}

export default function DishDetail(props){
    if(props.dishDetail){
        const commentsHTML=props.dishDetail.comments.map(comment=>{
            return <RenderComment comment={comment} />
        });
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dishDetail} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h3>Comments</h3>
                    {commentsHTML}
                </div>
            </div>
        );
    }else{
        return (<div></div>);
    }
 }