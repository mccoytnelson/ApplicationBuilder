(
    <div className='innerListing'> 
    <div className='innerInnerListing'>
        <div className='topInfo'> 
            <div>{listing.position}</div>
            <div>{listing.location}</div>
            <div>Company: {listing.company_name}</div>
        </div>
        <div className='listingDescription'>Description: {listing.description}</div>
        </div>
        <div className='listingRightSide'>
            <div className='timeStamp'>{timestamp.slice(0, 10)}</div>
            <Link to={`/completed-application/${this.props.ids.completed_id}`}><button>See Completed Application</button></Link>
            <button className='fillAppButton' onClick={()=>{this.props.deleteListing(this.props.listing.completed_id)}}>Delete Listing</button>

        </div>
    </div>
)