export const albumUploadForm = ({couple_key}) => (
    <div>
        <form action='/albumUpload' method='POST'>
            <small className="form-text text-muted">*required</small>
            
            <div className="form-group row" >
                <label htmlFor="inputPhotolink" className="col-sm-2 col-form-label">Photo link*</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputPhotolink" name="photo_link" placeholder="Photo link"></input>
                </div>
            </div>
    
            <div className="form-group row">
                <label htmlFor="inputDate" className="col-sm-2 col-form-label">Date</label>
                <div className="col-sm-10">
                  <input type="date" className="form-control" id="inputDate" name="date" placeholder="When did you take?"></input>
                </div>
            </div>
    
            <div className="form-group row">
                <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputDescription" name="descr" placeholder="Short explanation"></input>
                </div>
            </div>
    
            <div className="form-group row" >
                <div className="col-sm-10">
                  <input type="hidden" className="form-control" id="inputCoupleKey" name="couple_key" value={couple_key}></input>
                </div>
            </div>
            <button className="btn btn-primary btn-sm offset-11" type="submit" name="action" data-toggle="modal" data-target="#albumUploadModal">Upload</button>
        </form>
    
        <div className="modal fade" id="albumUploadModal" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Album uploading is processing!</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    )