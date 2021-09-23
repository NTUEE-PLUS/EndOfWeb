const asyncHandler = require('express-async-handler')
const Pending = require('../../../Schemas/user_pending')
const Login = require('../../../Schemas/user_login')
const Visual = require('../../../Schemas/user_visual_new')
const { ErrorHandler, dbCatch } = require('../../../error')

template = (success, link) => `<!DOCTYPE html>
<html>
   <body>
      <script>
         let count = 5
         setInterval(function(){
             if(count>1){
                 const counter = document.getElementById('counter');
                 console.log(counter)
                 count -= 1
                counter.innerHTML = (count)
            }else{
                window.location.href = "${link}";
            }
         }, 1000);
      </script>
      <h2>${
  success ? 'account activate success' : 'activation code expire'
}, redirecting to <a href='${link}'>${link}</a> after <strong id='counter'>5</strong> seconds</h2>
   </body>
</html>`

const main = async (req, res) => {
  const { account, active } = req.params
  if (!account || !active) throw new ErrorHandler(400, 'some params missing')
  const doc = await Pending.findOneAndDelete({ account, active }).catch(dbCatch)
  if (!doc) return res.send(template(false, '/#/register_entry'))
  const { username, userpsw, facebookID, email } = doc

  const { _id: visual } = await new Visual({
    username,
    account,
    publicEmail: email,
  })
    .save()
    .catch(dbCatch)
  await new Login({ username, account, facebookID, userpsw, visual }).save().catch(async (e) => {
    await Visual.findByIdAndRemove(visual).catch(dbCatch)
    console.log(e)
    throw new ErrorHandler(500, '資料庫錯誤')
  })
  res.send(template(true, '/#/login'))
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'account', checkAt: 'params' }]
module.exports = [valid(rules), asyncHandler(main)]
