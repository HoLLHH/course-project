import React, {useState } from 'react'
import "../css/bootstrap.css"
import "../css/style.css"

export default function Pagemain() {
	const [cardList1,setCardList1] = useState([
		{name:"card1",text:"text1"},
		{name:"card2",text:"text2"},
		{name:"card3",text:"text3"}
	]);
	const [cardList2,setCardList2] = useState([
		{name:"card4",text:"text4"},
		{name:"card5",text:"text5"},
		{name:"card6",text:"text6"}
	])

	return(
		<div className="container pt-5">

			<div className="row bg-light p-3">
				<div className="col-lg-12 mt-4">
					<div className="row">
						{cardList1.map((item,index) =>(
							<div key={index} className="col-md-4">
							<div className="card cardSize">
								<div className="card-body">
									<h5>{item.name}</h5>
									<p>{item.text}</p>
								</div>
							</div>
						</div>
						))}
						{/* <div className="col-md-4">
							<div className="card cardSize">
								<div className="card-body">
									<h5>card1</h5>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card cardSize">
								<div className="card-body">
									<h5>card2</h5>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card cardSize">
								<div className="card-body">
									<h5>card3</h5>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
			<div className="row bg-light p-3">
				<div className="col-lg-12 mt-4">
					<div className="row">
					{cardList2.map((item,index) =>(
							<div key={index} className="col-md-4">
							<div className="card cardSize">
								<div className="card-body">
									<h5>{item.name}</h5>
									<p>{item.text}</p>
								</div>
							</div>
						</div>
						))}
						{/* <div className="col-md-4">
							<div className="card cardSize">
								<div className="card-body">
									<h5>card4</h5>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card cardSize">
								<div className="card-body">
									<h5>card5</h5>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card cardSize">
								<div className="card-body">
									<h5>card6</h5>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	)
}
