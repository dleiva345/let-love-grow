import React, { Component } from 'react'

export const Album = ({albums, last_one}) => (
    <div id='album'>
        <div className='card-header p-0 border mt-1'>Album</div>
            <div id="AlbumCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    
                    {albums.map((album) => (
                        <div className="carousel-item">
                            <img className="d-block w-100" src={album.photo_link}></img>
                            <div className="carousel-caption">
                                <h5>{album.date.substring(0,10)}</h5>
                                <p>{album.descr}</p>
                            </div>
                        </div>
                    ))} 
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={last_one.photo_link}></img>
                        <div className="carousel-caption">
                            <h4>Your precious memories</h4>
                        </div>
                    </div>
   
                </div>
                <a className="carousel-control-prev" href="#AlbumCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#AlbumCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#albumModal">
          Go to your photo album
        </button>

        <div className="modal fade" id="albumModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Your album</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                More pictures will be here
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>


    </div>
)
