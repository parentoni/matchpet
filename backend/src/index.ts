import "./shared/infra/http/app";
import "./shared/infra/database/config";

//Subs
import "./modules/animals/subscriptions";
import "./modules/user/subscriptions";

//Cron
import "./modules/animals/infra/cron/index";
