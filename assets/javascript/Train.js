/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

/**
 * @file Contains the class definition of the Train
 * class.
 * @author Charles Roberts
 * @copyright Charles Roberts 2018
 */

/**
 * @classdesc The train class represents trains within the contect of 
 * the Ga Tech coding bootcamp homework assignment
 */
class Train
{
	constructor(incomingName, 
		        incomingDestination, 
		        incomingFrequency,
		        incomingTime)
	{
		this.name        = incomingName;
		this.destination = incomingDestination;
		this.firstTime   = incomingTime;
		this.frequency   = incomingFrequency;

		console.log(this);

	} // End of constructor()

} // End of class Train