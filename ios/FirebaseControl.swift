//
//  FirebaseControl.swift
//  boscoin_wallet
//
//  Created by macpro on 2018. 12. 19..
//  Copyright © 2018년 blockchainos. All rights reserved.
//

import Foundation
import Fabric
import Crashlytics

@objc(FirebaseControl)
class FirebaseControl: NSObject {
  
  @objc func useCrashlystic() -> Void {
    DispatchQueue.main.async {
      Fabric.with([Crashlytics.self])
      print("useCrashlystic initailized")
    }
  }
  
}
